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

    followUser = (event) => {
        event.preventDefault();

        let newFollowing = event.target.id;
        console.log("New Following ===> ");
        console.log(newFollowing);

        let reqData = {
            follow : newFollowing
        }

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');

        axios.post(defaultValues.serverURI + "/users/follow", reqData)
            .then( response => {
                console.log("Response is : " + JSON.stringify(response));

                if(response.status == 200){
                    let error = response.data.error;
                    if (!error){
                        alert("following " + newFollowing.toString());
                        
                    } else {
                        alert("Failed to follow " + newFollowing.toString());
                    }
                }
            });
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
                        <td><Button variant="primary" onClick={this.followUser} id={user["username"]}>Follow</Button></td>
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
                    <tr>
                        <td style={{fontWeight: 'bold', fontSize: '20px'}}>Username</td>
                        <td style={{fontWeight: 'bold', fontSize: '20px'}}>First Name</td>
                        <td style={{fontWeight: 'bold', fontSize: '20px'}}>Last Name</td>
                    </tr>
                    {restaurantList}
                </tbody>
                    
                </Table>
			</div>
        );
        
	}
}

export default UsersList;
