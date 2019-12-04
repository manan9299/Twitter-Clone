import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import {Redirect} from 'react-router';

import '../css/App.css';

class SearchUser extends Component {

	constructor(){
		super();
		this.state = {
			username : "",
			toUsersList : null,
			submitMessage : ""
		}
	}

	searchUser = (event) => {
		event.preventDefault();
		let username = this.state.username;

		let reqData = {
			username : username
		}

		// axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');
		localStorage.setItem('twitterUserSearch', username);

		console.log("Req Data is : " + JSON.stringify(reqData));
		this.setState({
			toUsersList : <Redirect to='/usersList' />
		})
	}

	searchChangeHandler = (event) => {
		this.setState({
			username : event.target.value
		})
	}
	
	render() {
		
        return(
            <div className="offset-sm-4 col-sm-3">
				{this.state.toUsersList}
				<Form>
					<Form.Group>
						<Form.Control onChange={this.searchChangeHandler} placeholder='Search Users' className='form-group' type="text" />
					</Form.Group>
					<Form.Group>
						<Button onClick={this.searchUser} variant="primary" block>
							Find
						</Button>
					</Form.Group>
				</Form>
			</div>
        );
        
	}
}

export default SearchUser;
