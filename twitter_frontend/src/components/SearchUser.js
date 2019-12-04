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

		// axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');
		localStorage.setItem('twitterUserSearch', username);
		this.setState({
			toUsersList : <Redirect to='/searchUserList' />
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
				<Form inline>
					<Form.Group style={{ marginTop: '20px'}}>
						<Form.Control onChange={this.searchChangeHandler} placeholder='Search Users' className='form-group' type="text" />
					</Form.Group>
					<Form.Group style={{ marginTop: '20px', marginLeft: '20px'}} >
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
