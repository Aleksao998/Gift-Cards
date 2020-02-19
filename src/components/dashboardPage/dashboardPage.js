import React from "react";
import QrScanner from "./qrScanner/qrScanner";
import ActiveCouponsTable from "./activeCouponsTable/activeCouponsTable";
class Dashboard  extends React.Component{
    constructor(props){
        super(props);
        this.searchByQr=this.searchByQr.bind(this);
        this.closeQrReader=this.closeQrReader.bind(this);
        this.state = {
            activateQrCamera:false,
            result: 'No result'
        }
    }
    handleScan = data => {
        if (data) {
          this.setState({result: data, activateQrCamera:false})
        }
      }
    handleError = err => {
        console.log(err)
    }
    closeQrReader(){
        this.setState({activateQrCamera: false})
    }
    searchByQr(){
        this.setState({activateQrCamera: true})
    }
    render(){
        
        return(
            <div>
                <div className="dashboardQRButton">             
                    <button type="submit" onClick={this.searchByQr} className="QrScannerButton"> <i className="fa fa-search"></i>Pretrazi Qr-kod</button>
                </div> 
                {
                    this.state.activateQrCamera ?
                    (
                        <QrScanner handleError={this.handleError} handleScan={this.handleScan} closeQrReader={this.closeQrReader}/>
                    ):
                    null
                }       
                
                <ActiveCouponsTable/>
             
             
                
               
              
            </div>
        )
    };
}


export default Dashboard;