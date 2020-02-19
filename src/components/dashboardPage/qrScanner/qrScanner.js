import React from "react";
import QrReader from 'react-qr-reader';


const QrScanner = (props) => {
    function handleScan(data){
        if (data) {

            props.handleScan(data);
        }
      }
    function handleError(err){
        console.log(err)
    }
    return (
        <div className="QrCameraField">
            <div className="dashboardQRButtonCamera">             
                <button type="submit" onClick={props.closeQrReader} className="QrScannerButton"> <i className="fa fa-search"></i>Zatvori QR-Skener</button>
            </div> 
            <QrReader
                className="QrRreader"
                delay={300}
                onError={handleError}
                onScan={handleScan}
            />   
    
        </div> 
    )
}


export default QrScanner;

