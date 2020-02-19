import React,{ Fragment } from "react";
import {NavLink} from "react-router-dom";
import {fire} from "../../firebase/firebase";
import { useAlert } from "react-alert";


const Header = (props) => {
    const alert = useAlert();
    function changeTitle(){
        switch(window.location.pathname){
          case '/':
              if(props.authenticated) return "Odjavi me";
              return 'Napravi nalog';
          case '/registration':
            return 'Nazad';
          default:
            return "Odjavi me";

        }
    }
    function changeAddress(){
        switch(window.location.pathname){
          case '/':
            if(props.authenticated) return "/";
            return '/registration';
          case '/registration':
            return '/';
            default:
                return "/";
        
         
        }
    }
    function menuButtonPress(title){
        if(title == "Odjavi me"){
            fire.auth().signOut();
        }
    }
  
    
        
    return(
        <header className="header">
        {
            
            props.authenticated
                ? (
                    <div className="dashboardMenu">
                        
                        <NavLink to="/" className="dashboardMenuButton" activeClassName="isActive" exact={true}>Aktivni vaučeri</NavLink>
                        <NavLink to="/neaktivniVauceri" className="dashboardMenuButton" activeClassName="isActive" exact={true}>Neaktivni vaučeri</NavLink>
                        <NavLink to="/dodajVaucer" className="dashboardMenuButton" activeClassName="isActive">Dodaj vaučere</NavLink>
                        <NavLink to="/izvestaj" className="dashboardMenuButton" activeClassName="isActive">Izveštaj</NavLink>
                        
                        <NavLink to={changeAddress()} onClick={() => menuButtonPress(changeTitle())} className="mainMenuButton">{changeTitle()}</NavLink>
                        <NavLink to={changeAddress()}
                            onClick={() => {
                                
                                var user = fire.auth().currentUser;
                                user.delete().then(function() {
                                    alert.success("Uspesno ste obrisali nalog!");
                                }).catch(function(error) {
                                    // An error happened.
                                });
                            }}
                            className="mainMenuButton"
                        >
                        Obrisi nalog
                        </NavLink>
                    </div>
                )
                
                : (
                    <div className="logoMenu">
                    <NavLink to={changeAddress()} onClick={() => menuButtonPress(changeTitle())} className="mainMenuButton">{changeTitle()}</NavLink>
                    </div>
                    )
        }
        
        
        </header>
    )
    
}

export default Header;