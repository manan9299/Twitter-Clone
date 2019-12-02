import React, { Component } from "react";
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import './navStyles.css'
// import {Redirect} from 'react-router';

class NavBar1 extends Component{
constructor(){
    super();
}


render(){
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to="/login"/>
        // }
        // let ownerLogin;
       

        return(
            <header id="header">
                {/* {redirectVar} */}
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    
                    <a className="navbar-brand" href="/"> 
                        <h3 className="font-weight-bold text-white" >&nbsp; Twitter</h3>
                    </a>
                </nav> 
            </header>
        ) ;
    }
}

export default NavBar1;