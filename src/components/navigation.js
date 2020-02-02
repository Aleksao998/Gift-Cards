import React from "react";
import {Router, Route, Switch, Link, NavLink} from "react-router-dom";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import createHistory from "history/createBrowserHistory";
import Dashboard from "./dashboardPage";
import DodajVaucerPage from "./dodajVaucerPage";
import IzvestajPage from "./izvestajPage";
import NotFoundPage from "./notFoundPage";
import Header from "./header";
import fire from "../firebase/firebase";









const history = createHistory();
class FrontMenuBar  extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            authenticated: false,
            user: {},
        };
    }
    componentWillMount(){
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState(({authenticated: true }));
                this.setState(({user}));
                console.log('user is logged '+this.state.authenticated);
            }
            else{
                this.setState(({authenticated: false }));
                this.setState(({user: null }));
                ;
                console.log("user not loggin "+this.state.authenticated);
            }
         });
    }
    componentWillUnmount(){
        fire.auth().signOut();
    }

    render(){
        return(
            <Router history={history}>
            <div>
            
            {(window.location.pathname == '/' ||  
              window.location.pathname == '/dodajVaucer' ||
              window.location.pathname == '/registration' ||
              window.location.pathname == '/izvestaj') 
              ? <Header authenticated={this.state.authenticated}/>
              : null
            }       
            
            
                <Switch>
                    	{
                            this.state.user 
                            ? (<Route path="/" component={Dashboard} exact={true}/>)
                            : (<Route path="/" component={()=><LoginPage history={history}/>}  exact={true}/>)
                        }
                    
                    <Route path="/registration" component={() =><RegistrationPage history={history}/>}/>
                    <Route path="/dodajVaucer" component={DodajVaucerPage}/>
                    <Route path="/izvestaj" component={IzvestajPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
               
            </div>
          
            </Router>
        )
     
    }
    
};

export default FrontMenuBar;