import React from "react";
import {fire} from "../../../firebase/firebase"



  
class LoginForm extends React.Component{

    constructor(props){
        super(props);
      
        this.login = this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.setError=this.setError.bind(this);
        this.state = {
            email:"",
            password:"",
            error:""
        }
    }

    handleChange(e){
        this.setState ({ [e.target.name]: e.target.value })
    }
    setError(error){
        this.setState ({ error:error})
    }
    login(e){
        e.preventDefault();
       
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
          this.props.history.push("/");
        }).catch((error)=> {
            this.setError(error.message);
        });
    }
    render(){
        let {error} = this.state;
        return (
            <div className="form">
                <form >
                {
                    error ? (<p className="error">{error}</p>) : null
                }
                
                <input  onChange={this.handleChange} type="email" name="email" placeholder="Enter email"></input>
      
                <input  onChange={this.handleChange} type="password" name="password" placeholder="Password"></input>
                
                <button type="submit" onClick={this.login}>Login</button>
                </form>
         
            </div>
        )
    }
   
};

export default LoginForm;