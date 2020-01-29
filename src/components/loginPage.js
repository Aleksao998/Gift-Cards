import React from "react";

import LoginForm from "./loginComponent/loginForm";
import Logo from "./loginComponent/logo";

class LoginPage  extends React.Component{
    constructor(props){
        super(props);
    }
  
    render(){
        return(
            <div>
            <Logo/>
            <LoginForm history={this.props.history}/>
            </div>
        )
    };
}

export default LoginPage;