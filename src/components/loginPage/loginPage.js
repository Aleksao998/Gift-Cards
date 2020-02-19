import React from "react";

import LoginForm from "./loginForm/loginForm";
import Logo from "./logo/logo";


const LoginPage = ({history}) => {
    return(
        <div>
            <Logo/>
            <LoginForm history={history}/>
        </div> 
    )
}


export default LoginPage;