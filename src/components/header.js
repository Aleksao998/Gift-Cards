import React from "react";
import {Link, NavLink} from "react-router-dom";
import fire from "../firebase/firebase";
class Header extends React.Component{
    constructor(props){
        super(props);
        this.changeTitle = this.changeTitle.bind();
        
    }
    changeTitle = () => {
        switch(window.location.pathname){
          case '/':
              if(this.props.authenticated) return "Odjavi me";
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
            if(this.props.authenticated) return "/";
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
                
                this.props.authenticated
                    ? (
                        <div className="dashboardMenu">
                        
                        <NavLink to="/" className="dashboardMenuButton" activeClassName="isActive" exact={true}>Pocetna</NavLink>
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

export default Header;