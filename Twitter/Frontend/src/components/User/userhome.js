import React, { Component } from "react";
import NavBar from "../Navbar/navbar";
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class OwnerHome extends Component{
    constructor(props){
        super(props)
        this.state={
            option:''
        }
    }

       render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        if(localStorage.getItem("jwt")===null){
            redirectVar = <Redirect to= "/login"/>
        }
       
        return(
            <div>
            {redirectVar}
            <NavBar/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-fluid shadow-sm" id="side-nav">  
                             <div className="card-body text-left list-group-flush" >
                             <ul className="navbar-nav">
                                <li className="nav-item  text-left">
                                    <a className="nav-link font-weight-bold"  id='neworders' href="/"  >Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='preparing'  href="#/explore" >Explore</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='delivering'  href="#/Notifications" >Notifications</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/Messaging">Messaging</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/Bookmarks" onClick={this.onPastOrders}>Bookmark</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/List" onClick={this.onPastOrders}>List</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="/account" onClick={this.onPastOrders}>Profile</a>
                                </li>
                             </ul>
                             </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card-fluid shadow-sm p-3 mb-5 rounded text-left">
                            {/*  {selectedView}
                            
                            


                            ADD tweet feed here
                            
                            
                            
                            
                            */}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default OwnerHome;