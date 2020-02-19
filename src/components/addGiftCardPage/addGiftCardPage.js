import React from "react";
import generator from "generate-password";
import {fire} from "../../firebase/firebase";
import LoadSpinner from "../../assets/loadSpinner";
import NewCoupon from "./tableNewCoupons/tableNewCoupons"


class DodajVaucerPage  extends React.Component{
    constructor(props){
        super(props);
        this.addCoupon = this.addCoupon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIndexState=this.handleIndexState.bind(this);
        this.removeLoader=this.removeLoader.bind(this);
        this.handleVaucerListStatewithPrevious=this.handleVaucerListStatewithPrevious.bind(this);
        this.handleNewVaucerListState=this.handleNewVaucerListState.bind(this);
        this.state = {
            number:0, 
            index:0,
            vaucerLista: [],       
            loading: true,
            visibility:""
        }
    }
    removeLoader(){
        this.setState({loading:false,
                       visibility:"hidden"})
    }
    
    handleChange(e){
        this.setState ({ number: e.target.value })
    }
    addCoupon = () => {
        
        for (let i = 0; i < this.state.number; i++) {
            let vaucerid=0;  
            let password = generator.generate({
                length: 10,
                numbers: true
            });
            let condition=false;
            const db = fire.firestore();
            let docRef = db.collection("NeaktivniVauceri").doc(password);
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
                    let dataItem = {
                        id:this.state.index++,
                        vaucerId:password,
                   
        
                    }
                    this.setState(prevState => ({
                        vaucerLista: [...prevState.vaucerLista, dataItem],
                        id:this.state.id,
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
    handleVaucerListStatewithPrevious(dataItem){
        this.setState(prevState => ({
            vaucerLista: [...prevState.vaucerLista, dataItem]
        })) 
    }
    handleNewVaucerListState(data){
        this.setState ({ vaucerLista: data })
    }
    handleIndexState(data){
        this.setState ({ index: data })
    }
    render(){
        let {visibility, loading, vaucerLista,index} = this.state;
        return(
            <div>
                <LoadSpinner visibility={visibility} loading={loading}/>
                
                <div className="AddVaucerFormInput">
                    <input  onChange={this.handleChange} id="numberInput" type="number" name="number"></input>
                </div> 
                <div className="AddVaucerFormButton">             
                    <button type="submit" onClick={this.addCoupon} className="addVaucerButton"> <i className="fa fa-plus"></i>   Dodaj vaucere</button>
                </div>     
            
                <NewCoupon removeLoader={this.removeLoader} 
                           handleNewVaucerListState={this.handleNewVaucerListState} 
                           handleVaucerListStatewithPrevious={this.handleVaucerListStatewithPrevious} 
                           vaucerLista={vaucerLista}
                           index={index}
                           handleIndexState={this.handleIndexState}
                />
                
                
            
           
        </div>
        )
    };
}

export default DodajVaucerPage;