import React from "react";
import fire from "../firebase/firebase";

class RegistrationPage  extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            email:"",
            password:"",
            confirmPassword: '',
            errorMsg:"",
        }
    }
    handleChange(e){
        this.setState ({ [e.target.name]: e.target.value })
    }
    register(e){
        e.preventDefault();
        if(this.state.password == this.state.confirmPassword){
            this.setState ({ errorMsg: "" })
            fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
                this.props.history.push("/dashboard");
             }).catch((error)=> {
                 console.log(error);
             });
        }
        else{
            this.setState ({ errorMsg: "Sifra se ne podudara!" })
        }
       
    }   
    
    render(){
        return(
            <div className=" m-t-10 form">
                <form>
                    <h3>Registracija</h3>
                    <input  onChange={this.handleChange} type="email" name="email" placeholder="Enter email"></input>
                    
                    <input  onChange={this.handleChange} type="password" name="password" placeholder="Password"></input>
                    <input  onChange={this.handleChange} type="password" name="confirmPassword" placeholder="Repeat Password"></input>
                    <p className="errorMsg">{this.state.errorMsg}</p>
                    <button type="submit" onClick={this.register}>Napravi nalog</button>
                </form>
            </div>
        )
    };
}


export default RegistrationPage;