import React from "react";
import {fire,deleteDocument} from "../../../firebase/firebase";
import MaterialTable from 'material-table';
import tableIcons from "../../../assets/tableIcons";

class ActiveCouponsTable  extends React.Component{
    constructor(props){
      super(props);
      this.getAllVaucer=this.getAllVaucer.bind(this);
      this.state = {
        vaucerLista: [],
    }
    }
    componentDidMount(){
        this.getAllVaucer();
    }
    getAllVaucer(){
      
        this.state.index=0;
        this.state.vaucerLista= [];
        const db = fire.firestore();
        db.collection("AktivniVauceri").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                
                let dataItem = {
                    id:this.state.index++,
                    vaucerId:doc.id,
                    vaucerPrice:doc.data().vaucerPrice,
                    vaucerEndDate:doc.data().vaucerEndDate,

                }
                this.setState(prevState => ({
                    vaucerLista: [...prevState.vaucerLista, dataItem]
                }))
            }.bind(this));
            
        }.bind(this));
       
        
       
    }
    render(){
        let {vaucerLista}= this.state
        return(
            <div >
            <MaterialTable
                
            icons={tableIcons}
            columns={[              
                { title: 'Vaucer Id', field: 'vaucerId' },
                { title: 'Cena', field: 'vaucerPrice' },
                { title: 'Datum isteka', field: 'vaucerEndDate' },
                 
            ]}
            data={vaucerLista}
            actions={[
                {
                    icon: 'folder_open',
                    tooltip: 'Open detail',
                    onClick: (event, rowData) => {
                        console.log("save Action")
                    }
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick:(event, rowData) => {
                        console.log("delete Action")
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
            
            title="Aktivni kuponi"
        /> 
            </div>
        )
    };
}


export default ActiveCouponsTable;