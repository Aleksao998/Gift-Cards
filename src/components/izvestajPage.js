import React from "react";
import {BarChart,Bar, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import MaterialTable from 'material-table';
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


import fire from "../firebase/firebase";
import database from 'firebase';
class IzvestajPage  extends React.Component{
    constructor(props){
        super(props);
       
        
        this.state = {
            selectedRow: null,
            weekDays:null
          }
    }
    componentDidMount(){
        console.log("didaMount");
        const db = fire.firestore();
        db.collection("Izvestaj")
          .get()
          .then(snapshot=>{
            const dani=[];
            snapshot.forEach(doc =>{
                const data = doc.data();
                dani.push(data);
            })
            this.setState ({ weekDays: dani })
            
          })
          .catch(error => console.log(error))
    }
    render(){
        if(this.state.weekDays != null){
            console.log(this.state.weekDays[1].Ponedeljak[0]);
        }
        const data = [
            {
              "name": "Pon",
              "prodato-po-danu": 36,
              
            },
            {
              "name": "Utorak",
              "prodato-po-danu": 55,

            },
            {
              "name":"Sreda",
              "prodato-po-danu": 35,
             
            },
            {
              "name":"Cetvrtak",
              "prodato-po-danu": 27,
            
            },
            {
              "name": "Petak",
              "prodato-po-danu": 60,
           
            },
            {
              "name": "Subota",
              "prodato-po-danu": 23,
           
            },
            {
              "name": "Nedelja",
              "prodato-po-danu": 13,
        
            }
          ]

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
              <div className="chartDiv">                    
                <BarChart width={1000} height={250} data={data} className="chart">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    
                    <Bar dataKey="prodato-po-danu" fill="#50697e" barSize={50}/>
                </BarChart>
              </div>
              
            <div style={{ maxWidth: '100%'}} className="tableIzvod">
              <MaterialTable
              
                icons={tableIcons}
                columns={[
                    { title: 'Dan', field: 'name' },
                    { title: 'Ukupno prodato', field: 'uk' },
                    { title: 'Ukupna zarada', field: 'ukZarada' },
                  
                ]}
                data={
                    [{ name: 'Ponedeljak', uk:"36",ukZarada:"30000"},
                     { name: 'Utorak', uk:"55",ukZarada:"54300"},
                     { name: 'Sreda', uk:"35",ukZarada:"12000"},
                     { name: 'Cetvrtak', uk:"27",ukZarada:"8600"},
                     { name: 'Petak', uk:"60",ukZarada:"81500"},
                     { name: 'Subota', uk:"23",ukZarada:"17000"},
                     { name: 'Nedelja', uk:"13",ukZarada:"13000"}
                    ]
                }
                onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
                options={{
                    exportButton: true,
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                      }),
                      pageSize:7,
                      paging:true
                  }}
                  localization={{
                    pagination: {
                        labelRowsPerPage:"7"
                    },
                    
                }}
                
                title="Nedeljni izvod"
              />
              </div>
            </div>
        )
    };
}

export default IzvestajPage;