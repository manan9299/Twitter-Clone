import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import LoginForm from '../components/Login/login';
import CustomerSignUp from './Signup/customersignup'
import Account from './Account/account';
import OwnerHome from './User/userhome';


class MainRoutes extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LoginForm} />
                <Route path="/login" component={LoginForm} />
                <Route path="/signup" component={CustomerSignUp} />
                <Route path="/account" component={Account} />
                <Route path="/userhome" component={OwnerHome} />
                
            </div>
        )
    }
}

export default MainRoutes;