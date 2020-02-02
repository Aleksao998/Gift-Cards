import React from "react";

import LoginForm from "./loginComponent/loginForm";
import Logo from "./loginComponent/logo";


const LoginPage = ({history}) => {
    return(
        <div>
            <Logo/>
            <LoginForm history={history}/>
        </div> 
    )
}


export default LoginPage;