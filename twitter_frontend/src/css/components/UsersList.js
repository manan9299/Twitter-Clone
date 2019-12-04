import React, {Component} from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import defaultValues from '../constants/defaultValues';

import '../css/App.css';

class UsersList extends Component {

    constructor(){
        super();
        this.state = {
            searchUsersList : [],
            toRestaurantDetails : null
        }
    }

    componentDidMount(){
        
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');

        let reqData = {
            username : localStorage.getItem("twitterUserSearch")
        }

        axios.post(defaultValues.serverURI + "/users/searchUser", reqData)
            .then(response => {
                console.log("Response is : " + JSON.stringify(response, null, 4));
                let users = response.data.user;
                
                this.setState({
                    searchUsersList : users
                });
            });
    }

    setRestaurant = (event) => {
        event.preventDefault();

        let reqData = {
            selectedRestaurantId : event.target.id
        }

        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');

        // axios.post("http://3.88.210.120:3001/setSelectedRestaurant", reqData)
        //     .then( response => {
        //         console.log("Response is : " + JSON.stringify(response));

        //         if(response.status == 200){
        //             let status = response.data.status;
        //             if (status == 200){
        //                 this.setState({
        //                     toRestaurantDetails : <Redirect to='/showrestaurantmenu' />
        //                 });
        //             } else {
        //                 this.setState({
        //                     toRestaurantDetails : <Redirect to='/buyerhome' />
        //                 });
        //             }
        //         }
        //     });
    }

    getRestaurants = () => {
        let searchUsersList = this.state.searchUsersList;

        if (searchUsersList.length == 0){
            return (
                <tr>
                    <td colSpan='4'>No Results</td>
                </tr>
            );
        } else {
            let users = searchUsersList.map((user) => {
                
                return (
                    <tr>
                        <td>{user["username"]}</td>
                        <td>{user["firstName"]}</td>
                        <td>{user["lastName"]}</td>
                        <td><Button variant="primary" onClick={this.setRestaurant} id={user["userName"]}>Follow</Button></td>
                    </tr>
                );
            });
            return users;
        }
    }
	
	render() {
        
        let restaurantList = this.getRestaurants();
        
        return(
            <div >
                {/* {redirectVar}
                {this.state.toRestaurantDetails} */}
				<Table className="offset-sm-3" style={{width: '50%', marginTop: '2rem'}}>
                <thead>
                    <tr>
                        <th colSpan='4' style={{fontWeight: 'bold', fontSize: '30px'}}>Users :</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantList}
                </tbody>
                    
                </Table>
			</div>
        );
        
	}
}

export default UsersList;
