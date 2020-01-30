import React from "react";
import {Router, Route, Switch, Link, NavLink} from "react-router-dom";
import RegistrationPage from "./registrationPage";
import LoginPage from "./loginPage";
import createHistory from "history/createBrowserHistory"
import Dashboard from "./dashboardPage";
import DodajVaucerPage from "./dodajVaucerPage"
import IzvestajPage from "./izvestajPage"
import fire from "../firebase/firebase"




class Header extends React.Component{
    constructor(props){
        super(props);
    }
    changeTitle = () => {
        switch(window.location.pathname){
          case '/':
            return 'Napravi nalog';
          case '/registration':
            return 'Nazad';
          default:
            return "Odjavi me";

        }
    }
    changeAddress = () => {
        switch(window.location.pathname){
          case '/':
            return '/registration';
          case '/registration':
            return '/';
            default:
                return "/";
        
         
        }
    }
    menuButtonPress(title){
        if(title == "Odjavi me"){
            fire.auth().signOut();
        }
    }
    render(){
        return(
            
            <header className="header">
            {
                //DashBoardMenuBar
                this.props.authenticated 
                    ? (
                        <div className="dashboardMenu">
                        
                        <NavLink to="/dashboard" className="dashboardMenuButton" activeClassName="isActive">Pocetna</NavLink>
                        <NavLink to="/dodajVaucer" className="dashboardMenuButton" activeClassName="isActive">Dodaj vaučere</NavLink>
                        <NavLink to="/izvestaj" className="dashboardMenuButton" activeClassName="isActive">Izveštaj</NavLink>
                        
                        <Link to={this.changeAddress()} onClick={() => this.menuButtonPress(this.changeTitle())} className="mainMenuButton">{this.changeTitle()}</Link>
                        </div>
                    )
                    
                    : (
                        <div className="logoMenu">
                        <Link to={this.changeAddress()} onClick={() => this.menuButtonPress(this.changeTitle())} className="mainMenuButton">{this.changeTitle()}</Link>
                        </div>
                        )
            }
            
            
            </header>
        )
    }
}

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
                this.setState(()=> ({authenticated: true }));
                this.setState(()=> ({user}));
                console.log('user is logged '+this.state.authenticated);
            }
            else{
                this.setState(()=> ({authenticated: false }));
                this.setState(()=> ({user: null }));
                ;
                console.log("user not loggin "+this.state.authenticated);
            }
         });
    }

    render(){
        return(
            <Router history={history}>
            <div>
            <Header authenticated={this.state.authenticated}/>
            
                <Switch>
                    	{
                            this.state.user 
                            ? (<Route path="/" component={()=><Dashboard/>}  exact={true}/>)
                            : (<Route path="/" component={()=><LoginPage history={history}/>}  exact={true}/>)
                        }
                    
                    <Route path="/registration" component={() =><RegistrationPage history={history}/>}/>
                    <Route path="/dodajVaucer" component={DodajVaucerPage}/>
                    <Route path="/izvestaj" component={IzvestajPage}/>
                </Switch>
               
            </div>
          
            </Router>
        )
     
    }
    
};

export default FrontMenuBar;