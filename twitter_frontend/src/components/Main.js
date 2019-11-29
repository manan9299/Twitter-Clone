import React, {Component} from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './home';
import Default from './default';

//Create a Main Component
class Main extends Component {
    render(){
        return(
                <div>                
                    <Switch>
                    
                    <Route path="/home" component={Home}/>
                    <Route path="/" component={Default}/>
                    </Switch>
                </div>
        )
    }
}
//Export The Main Component
export default Main;