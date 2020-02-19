import React from "react";
import {fire,deleteDocument} from "../../../firebase/firebase";
import MaterialTable from 'material-table';
import tableIcons from "../../../assets/tableIcons";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
class InactiveCouponsTable  extends React.Component{
    constructor(props){
      super(props);
      this.handleChange=this.handleChange.bind(this);
      this.getAllVaucer=this.getAllVaucer.bind(this);
      this.state = {
        vaucerLista: [],
        cena:"",
    }
    }
    componentDidMount(){
        this.getAllVaucer();
    }
    getAllVaucer(){
        this.state.index=0;
        this.state.vaucerLista= [];
        const db = fire.firestore();
        db.collection("AktivniNeiskorisceniVauceri").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
                let dataItem = {
                    id:this.state.index++,
                    vaucerId:doc.id,

                }
                this.setState(prevState => ({
                    vaucerLista: [...prevState.vaucerLista, dataItem]
                }))
            }.bind(this));
            this.props.removeLoader();
        }.bind(this));
        
        
       
    }
    handleClickDelete(rowData){
        deleteDocument("AktivniNeiskorisceniVauceri",rowData.vaucerId);
        let index=-1;
        for(let i = 0; i < this.state.vaucerLista.length; i++) {
            if(this.state.vaucerLista[i]['vaucerId'] === rowData.vaucerId) {
                index = i;
                break;
            }
        }
        if(index != -1){
            let data = this.state.vaucerLista;
            data.splice(index, 1);
            this.setState ({ vaucerLista: data })
        }
        else{
            console.log("ERROR: Index not found![dodajVaucerPage.js->handleClickDelete()");
        }
        
    }
    handleClickTransfer(rowData){
        const db = fire.firestore();
        db.collection("NeaktivniVauceri").doc(rowData.vaucerId).set({  
            password: rowData.vaucerId                    
        })
        this.handleClickDelete(rowData);
    }
    handleClickSave(rowData, cena){
        let cenaInteger = parseInt(cena, 10);
        let tempDate = new Date();
        let date =(tempDate.getMonth()+7) + '.' + tempDate.getDate() + '.' + tempDate.getFullYear();
        
        const db = fire.firestore();
        
        db.collection("AktivniVauceri").doc(rowData.vaucerId).set({  
            vaucerPrice: cenaInteger,
            vaucerEndDate:date,                
        })
        
        this.handleClickDelete(rowData);
        
    }
    handleChange(e){
        this.setState ({ cena: e.target.value })
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
            data={vaucerLista}
            actions={[
                {
                    icon: 'save',
                    tooltip: 'Save User',
                    onClick: (event, rowData) => {
                        confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className='custom-ui'>
                                <form>
                                  <h4>Kreiranje kupona</h4>
                                  <div className="m-b-05">
                                  <label htmlfor="cars">Izaberite cenu:</label>
                                    <select name="price" onChange={this.handleChange}>
                                        <option value="0">0</option>
                                        <option value="500">500</option>
                                        <option value="1000">1000</option>
                                        <option value="1500">1500</option>
                                        <option value="2000">2000</option>
                                    </select>
                                 </div>
                                  <button onClick={onClose}>Zatvori</button>
                                  <button
                                    onClick={() => {
                                      this.handleClickSave(rowData, this.state.cena);
                                      onClose();
                                    }}
                                  >
                                   Napravi kupon
                                  </button>
                                </form>
                                </div>
                              );
                            }
                          });
                    }
                    
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick:(event, rowData) => {
                        confirmAlert({
                            customUI: ({ onClose }) => {
                              return (
                                <div className='custom-ui'>
                                  <h4>Are you sure?</h4>
                                  <p>You want to transfer this file?</p>
                                  <button onClick={onClose}>No</button>
                                  <button
                                    onClick={() => {
                                      this.handleClickTransfer(rowData);
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
                    labelRowsPerPage:"6"
                },
                
            }}
            
            title="Neaktivni Vauceri"
        /> 
            </div>
        )
    };
}


export default InactiveCouponsTable;