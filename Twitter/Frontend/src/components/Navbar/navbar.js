import React, { Component } from "react";
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import './navStyles.css'
// import {Redirect} from 'react-router';

class NavBar extends Component{
constructor(){
    super();
    this.handleLogout=this.handleLogout.bind(this)
}

handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        localStorage.removeItem('accountType')
        localStorage.clear();
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
                    <form class="form-inline">
                    <input class="form-control mr-sm-2 search-input" type="search" placeholder="Search Twitter" name="search" id="search"/>
                    <button class="btn btn-search my-2 my-sm-0 " type="submit">
                        <i class="fa fa-search"></i>
                    </button>
                    </form>
                    
                    <ul className="nav navbar-inverse ">
                            <li><Link to="/" onClick = {this.handleLogout}>Logout</Link></li>
                    </ul>                </nav> 
            </header>
        ) ;
    }
}

export default NavBar;