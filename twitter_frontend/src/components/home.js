import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

import PostTweet from './PostTweet';

import '../css/App.css';

class Home extends Component {

	constructor(){
		super();
		this.state = {
			dishName : "",
			toRestaurantList : null,
			submitMessage : ""
		}
	}

	findFood = (event) => {
		event.preventDefault();
		let dishName = this.state.dishName;

		let reqData = {
			dishName : dishName
		}

		axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');
		console.log("Req Data is : " + JSON.stringify(reqData));

		axios.post("http://3.88.210.120:3001/setUserPref", reqData)
			.then( response => {

                if(response.status == 200){
					let status = response.data.status;
					
                    if (status == 200){
                        this.setState({
							toRestaurantList : <Redirect to='/filteredrestaurants' />
						});
                    } else {
                        this.setState({
							toRestaurantList : <Redirect to='/' />
						});
                    }
                } else {
                    this.setState({
						submitMessage : "Could not get a response from the server"
					});
                }
			});
	}

	dishChangeHandler = (event) => {
		this.setState({
			dishName : event.target.value
		})
	}
	
	render() {
		// let redirectVar = null;
		// if(!localStorage.getItem('grubhubUserToken')){
		// 	redirectVar = <Redirect to= "/buyerlogin"/>
		// }
        
        return(
			<div>
                <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card-fluid shadow-sm" id="side-nav">  
                             <div className="card-body text-left list-group-flush" >
                             <ul className="navbar-nav">
                                <li className="nav-item  text-left">
                                    <a className="nav-link font-weight-bold"  id='neworders' href="/home"  >Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='preparing'  href="#/explore" >Explore</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/Messaging">Messaging</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="/searchUser">Search Users</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="#/List" onClick={this.onPastOrders}>List</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link font-weight-bold" id='pastorders' href="/viewUserTweets">Profile</a>
                                </li>
								<li className="nav-item">
                                    <a className="nav-link font-weight-bold" ><PostTweet /></a>
                                </li>
                             </ul>
                             </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card-fluid shadow-sm p-3 mb-5 rounded text-left">
							{/* <PostTweet/> */}
                        </div>
                    </div>
                </div>
            </div>
            </div>
            // <div className="offset-sm-4 col-sm-3">
			// 	{redirectVar}
			// 	{this.state.toRestaurantList}
			// 	<Form>
			// 		<Form.Text>
			// 			Who delivers in your City?
			// 		</Form.Text>
			// 		<Form.Group >
			// 			<Form.Label>Enter a dish</Form.Label>
			// 			<Form.Control onChange={this.dishChangeHandler} placeholder='Pizza, Tacos, etc.' className='form-group' type="text" />
			// 		</Form.Group>
			// 		<Form.Group>
			// 			<Button onClick={this.findFood} variant="primary" block>
			// 				Find Food
			// 			</Button>
			// 		</Form.Group>
			// 	</Form>
			// </div>
        );
        
	}
}

export default Home;
