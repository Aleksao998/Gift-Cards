import React from "react";
import QRCode  from "qrcode.react";
import {fire,deleteDocument} from "../../../firebase/firebase";
import MaterialTable from 'material-table';
import tableIcons from "../../../assets/tableIcons.js"
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


class NewCoupons  extends React.Component{
    constructor(props){
      super(props);
      this.getAllVaucer=this.getAllVaucer.bind(this);
      this.handleClickQrCode=this.handleClickQrCode.bind(this);
      this.state = {
        qrId:"12",
        cena:"",
    }
    }
    componentDidMount(){
        this.getAllVaucer();
    }
    getAllVaucer(){
        this.props.handleIndexState(0);
        const db = fire.firestore();
        db.collection("NeaktivniVauceri").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let idd=this.props.index+1;
                this.props.handleIndexState(idd);
                let dataItem = {
                    id:this.props.index,
                    vaucerId:doc.id,

                }
                this.props.handleVaucerListStatewithPrevious(dataItem);
            }.bind(this));
            this.props.removeLoader();
        }.bind(this));
        
        
       
    }
    handleClickDelete(rowData){
        deleteDocument("NeaktivniVauceri",rowData.vaucerId);
        let index=-1;
        for(let i = 0; i < this.props.vaucerLista.length; i++) {
            if(this.props.vaucerLista[i]['vaucerId'] === rowData.vaucerId) {
                index = i;
                break;
            }
        }
        if(index != -1){
            let data = this.props.vaucerLista;
            data.splice(index, 1);
            this.props.handleNewVaucerListState(data);
            
        }
        else{
            console.log("ERROR: Index not found![dodajVaucerPage.js->handleClickDelete()");
        }
        
    }
    handleClickSave(rowData){
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
        let {vaucerLista}= this.state
        return(
            <div >
                <MaterialTable
                    
                icons={tableIcons}
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Vaucer Id', field: 'vaucerId' },
                
                
                ]}
                data={this.props.vaucerLista}
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
                        labelRowsPerPage:"5"
                    },
                    
                }}
                
                title="Vauceri u pripremi:"
            />


                <div className="hidden">
                    <QRCode id={this.state.qrId} value={this.state.qrId}/>
                </div>
            </div>
        )
    };
}


export default NewCoupons;