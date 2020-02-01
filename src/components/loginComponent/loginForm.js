import React from "react";
import fire from "../../firebase/firebase"



  
class LoginForm extends React.Component{

    constructor(props){
        super(props);
      
        this.login = this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.state = {
            email:"",
            password:""
        }
    }

    handleChange(e){
        this.setState ({ [e.target.name]: e.target.value })
    }
    login(e){
        e.preventDefault();
       
        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
          this.props.history.push("/");
        }).catch((error)=> {
            console.log(error);
        });
    }
    render(){
        return (
            <div className="form">
                <form >
                
                <input  onChange={this.handleChange} type="email" name="email" placeholder="Enter email"></input>
      
                <input  onChange={this.handleChange} type="password" name="password" placeholder="Password"></input>
                
                <button type="submit" onClick={this.login}>Login</button>
                </form>
         
            </div>
        )
    }
   
};

export default LoginForm;