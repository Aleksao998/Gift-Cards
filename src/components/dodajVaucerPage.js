import React from "react";
import QRCode  from "qrcode.react";
import generator from "generate-password";
import fire from "../firebase/firebase";
import MaterialTable from 'material-table';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';


class DodajVaucerPage  extends React.Component{
    constructor(props){
        super(props);
        this.addCoupon = this.addCoupon.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.getAllVaucer=this.getAllVaucer.bind(this);
        this.handleClickDelete=this.handleClickDelete.bind(this);
        this.handleClickSave=this.handleClickSave.bind(this);
        this.handleClickQrCode=this.handleClickQrCode.bind(this);
        this.state = {
            number:0,
            index:0,
            vaucerLista: [],
            qrId:"12",
        }
    }
    componentDidMount(){
        this.getAllVaucer();
    }
    handleChange(e){
        this.setState ({ number: e.target.value })
    }

    
    addCoupon = () => {
        
        for (var i = 0; i < this.state.number; i++) {
            var vaucerid=0;  
            var password = generator.generate({
                length: 10,
                numbers: true
            });
            var condition=false;
            const db = fire.firestore();
            var docRef = db.collection("NeaktivniVauceri").doc(password);
            docRef.get().then(function(doc) {  
                if (doc.exists) {
                    condition=true;
                } else {
                    condition=false;
                   
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
            if(condition==false){
                
                db.collection("NeaktivniVauceri").doc(password).set({  
                    password: password                    
                })
                .then(function() {
                    var dataItem = {
                        id:this.state.index++,
                        vaucerId:password,
                   
        
                    }
                    this.setState(prevState => ({
                        vaucerLista: [...prevState.vaucerLista, dataItem]
                    }))
                    console.log("Document successfully written!");
                }.bind(this))
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
            else{
                i--;
                console.log("ERROR: Id already exist");
            }
            document.getElementById('numberInput').value='';
           
            
            
        } 
    };
    getAllVaucer(){
        var vaucerListee = [];
        this.state.index=0;
        this.state.vaucerLista= [];
        const db = fire.firestore();
        db.collection("NeaktivniVauceri").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
                var dataItem = {
                    id:this.state.index++,
                    vaucerId:doc.id,
     

                }
                this.setState(prevState => ({
                    vaucerLista: [...prevState.vaucerLista, dataItem]
                }))
            }.bind(this));
        }.bind(this));
    
        
       
    }
    handleClickDelete(rowData){
        const db = fire.firestore();
        db.collection("NeaktivniVauceri").doc(rowData.vaucerId).delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
        var index=-1;
        for(var i = 0; i < this.state.vaucerLista.length; i++) {
            if(this.state.vaucerLista[i]['vaucerId'] === rowData.vaucerId) {
                index = i;
                break;
            }
        }
        if(index != -1){
            console.log(index);
        }
        let data = this.state.vaucerLista;
        data.splice(index, 1);
        this.setState ({ vaucerLista: data })
    }

    handleClickSave(rowData){
        var vaucerId=rowData.vaucerId;
        const db = fire.firestore();
        db.collection("AktivniNeiskorisceniVauceri").doc(rowData.vaucerId).set({  
            password: rowData.vaucerId                    
        })
        this.handleClickDelete(rowData);
    }
    handleClickQrCode(){      
        const canvas = document.getElementById(this.state.qrId);
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = this.state.qrId+".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
    }
    render(){
        
          const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };
         
          
          
        return(
            <div>
            
                <div className="AddVaucerFormInput">
                    <input  onChange={this.handleChange} id="numberInput" type="number" name="number"></input>
                </div> 
                <div className="AddVaucerFormButton">             
                    <button type="submit" onClick={this.addCoupon} className="addVaucerButton"> <i className="fa fa-plus"></i>   Dodaj vaucere</button>
                </div>     
                <div>
                    <MaterialTable
                
                    icons={tableIcons}
                    columns={[
                        { title: 'Id', field: 'id' },
                        { title: 'Vaucer Id', field: 'vaucerId' },
                       
                    
                    ]}
                    data={this.state.vaucerLista}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => {
                                confirmAlert({
                                    customUI: ({ onClose }) => {
                                      return (
                                        <div className='custom-ui'>
                                          <h4>Are you sure?</h4>
                                          <p>You want to transfer this file?</p>
                                          <button onClick={onClose}>No</button>
                                          <button
                                            onClick={() => {
                                              this.handleClickSave(rowData);
                                              onClose();
                                            }}
                                          >
                                            Yes, Save it!
                                          </button>
                                        </div>
                                      );
                                    }
                                  });
                            }
                        },
                        {
                            icon: 'delete',
                            tooltip: 'Delete User',
                            onClick: (event, rowData) => {

                                confirmAlert({
                                    customUI: ({ onClose }) => {
                                      return (
                                        <div className='custom-ui'>
                                          <h4>Are you sure?</h4>
                                          <p>You want to delete this file?</p>
                                          <button onClick={onClose}>No</button>
                                          <button
                                            onClick={() => {
                                              this.handleClickDelete(rowData);
                                              onClose();
                                            }}
                                          >
                                            Yes, Delete it!
                                          </button>
                                        </div>
                                      );
                                    }
                                  });

                                
                                
                            }
                        },
                        {
                        icon: 'save_alt',
                        tooltip: 'qr',
                        onClick: (event, rowData) => {
                            this.setState ({ qrId: rowData.vaucerId }, this.handleClickQrCode)
                               
                        }
                        },
                      ]}
                    options={{
                        rowStyle: rowData => ({
                            backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                        }),
                        pageSize:5,
                        paging:true
                    }}
                    localization={{
                        pagination: {
                            labelRowsPerPage:"7"
                        },
                        
                    }}
                    
                    title="Vauceri u pripremi:"
                />
            </div> 
            <div className="hidden">
            <QRCode id={this.state.qrId} value={this.state.qrId}/>
            </div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        </div>
        )
    };
}

export default DodajVaucerPage;