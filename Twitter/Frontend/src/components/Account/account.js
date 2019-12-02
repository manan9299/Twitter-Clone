import React, { Component } from "react";
import NavBar from "../Navbar/navbar";
import cookie from 'react-cookies';
import UserProfile from "../profile/userprofile";
import {Redirect} from 'react-router';


class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: ''
        }

        this.onProfile = this.onProfile.bind(this);
    }

    onProfile() {
        this.setState({
            option: '1'
        })
    }


    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            redirectVar = <Redirect to="/login" />
        }
        let selectedView = null
        if (this.state.option === '') {
            selectedView = <UserProfile />
        }
        if (this.state.option === '1') {
            selectedView = <UserProfile />
            document.getElementById('profile').style.color = 'black'
            
        }
        return (
            <div>
                {redirectVar}
                <NavBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="card-fluid shadow-sm" id="side-nav">
                                <div className="card-body text-left list-group-flush" >
                                    <h3 className="font-weight-bold">Your account</h3>
                                    <ul className="navbar-nav">
                                        <li className="nav-item  text-left">
                                            <a className="nav-link font-weight-bold" id='profile' href="#/profile" onClick={this.onProfile}>Profile</a>
                                            <a className="nav-link font-weight-bold" id='profile' href="/Tweetfeed" >My Tweets</a>
                                            <a className="nav-link font-weight-bold" id='profile' href="/">Home</a>

                                        </li>
                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-9">
                            {selectedView}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Account;