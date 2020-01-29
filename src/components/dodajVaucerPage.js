import React from "react";
import QRCode  from "qrcode.react";
import generator from "generate-password";
import fire from "../firebase/firebase";
/*
    <QRCode id="123456" value="123456"/>
    <a onClick={downloadQR}> Download QR </a>
*/

class DodajVaucerPage  extends React.Component{
    constructor(props){
        super(props);
        this.addCoupon = this.addCoupon.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            number:0
        }
    }

    handleChange(e){
        this.setState ({ number: e.target.value })
    }

    downloadQR = () => {
        const canvas = document.getElementById("123456");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "123456.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    
    addCoupon = () => {
        for (var i = 0; i < this.state.number; i++) {
            var password = generator.generate({
                length: 10,
                numbers: true
            });
            var condition=false;
            console.log(password);
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
                        
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
            else{
                i--;
            }
            
            
            
        } 
    };

    render(){
        return(
            <div>
            <form >
                <input  onChange={this.handleChange} type="number" name="number"></input>
                <button type="submit" onClick={this.addCoupon}>Dodaj vaucere</button>
            </form>
            </div>
        )
    };
}

export default DodajVaucerPage;