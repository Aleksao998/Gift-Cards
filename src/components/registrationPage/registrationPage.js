import React from "react";
import isEmail from 'validator/lib/isEmail';
import {fire} from "../../firebase/firebase";

class RegistrationPage  extends React.Component{
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setError=this.setError.bind(this);
        this.state = {
            email:"",
            emailValid:false,
            password:"",
            confirmPassword: '',
            error:"",
        }
    }
    handleChange(e){
        this.setState ({ [e.target.name]: e.target.value })
    }
    setError(error){
        this.setState ({ error:error})
    }
    register(e){
        e.preventDefault();
        if(isEmail(this.state.email)) this.state.emailValid=true;
        else this.state.emailValid=false;
        if(this.state.emailValid == true){
            if(this.state.password == this.state.confirmPassword){
                this.setState ({ errorMsg: "" })
                fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
                    this.props.history.push("/");
                 }).catch((error)=> {
                     this.setError(error.message);
                 });
            }
            //if password does not match
            else{
                this.setError("Password does not match!");
            }
        }
        //incorect email
        else{
            this.setError("Email format is not correct");
        }
        
       
    }   
    
    render(){
        let {error}= this.state;
        return(
            <div className=" m-t-10 form">
                <form>
                    <h3>Registracija</h3>
                    <input  onChange={this.handleChange} type="email" name="email" placeholder="Enter email" required></input>
                    
                    <input  onChange={this.handleChange} type="password" name="password" placeholder="Password"></input>
                    <input  onChange={this.handleChange} type="password" name="confirmPassword" placeholder="Repeat Password"></input>
                    {
                        this.state.error ? <p className="error">{error}</p> : null
                    }
                    
                    <button type="submit" onClick={this.register}>Napravi nalog</button>
                </form>
            </div>
        )
    };
}


export default RegistrationPage;