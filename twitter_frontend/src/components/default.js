import React, { Component } from "react";
import {Redirect} from 'react-router';

/**
 * @author Dharmang Solanki
 */
export default class Default extends Component{


    render(){
        let redirectToHome = <Redirect to= "/home"/>
        return(    
            <div>
                {redirectToHome}
            </div>
                
        );
    }

}