import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import Messaging from './Message/message';



class Main extends Component {
    render() {
        return (
            <div>

                <Route exact path="/messaging" component={Messaging} />
                

            </div>
        )
    }
}
//Export The Main Component
export default Main;