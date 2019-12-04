import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import defaultValues from '../constants/defaultValues';

import '../css/App.css';

class Login extends Component {

	constructor(props){
		super(props);

		this.state = {
			username : "",
			password : "",
			authFlag : false,
			authMessage : "",
			isEmailValid : false,
			isPasswordValid : false,
			redirectToHome : ""
		}
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
	}

	submitLogin = (event) => {
		event.preventDefault();
		let reqData = {
			username : this.state.username,
			password : this.state.password
		}

		axios.post(defaultValues.serverURI + '/users/login', reqData)
			.then(response => {
				console.log("response is " + JSON.stringify(response));
				if (response.status == 200){
					// response = JSON.parse(JSON.stringify(response));
					let {error} = response.data ;
					
					if (!error) {
						let token = response.data.token;
						localStorage.setItem('grubhubToken', token);
						this.setState({
							authFlag : true,
							authMessage : "",
							redirectToHome : <Redirect to= "/home"/>
						});
					} else {
						this.setState({
							authFlag : false,
							authMessage : response.data.error,
						});
					}
				} else {
					this.setState({
						authFlag : false,
						authMessage : "Error while fetching Data from Backend"
					})
				}
			})
	}

	usernameChangeHandler = (event) => {
		let username = event.target.value;
		if (username != ""){
			this.setState({
				username : username,
				isEmailValid : true
			});
		} else {
			this.setState({
				isEmailValid : false
			});
		}
	}

	passwordChangeHandler = (event) => {
		let password = event.target.value;
		if (password != ""){
			this.setState({
			password : password,
			isPasswordValid : true
			});
		} else {
			this.setState({
			isPasswordValid : false
			});
		}
	}

	render() {
		let {isEmailValid, isPasswordValid} = this.state;
		let emailErrorMessage = isEmailValid ? "" : "Email is Invalid";
		let passwordErrorMessage = isPasswordValid ? "" : "Password is Invalid";
		let authMessage = this.state.authFlag ? "" : this.state.authMessage;
		let redirectToHome = this.state.redirectToHome;

		return (
			<div className="offset-sm-4 col-sm-3">
			{redirectToHome}
			<Form>
				<Form.Text>
				Log in to Twitter
				</Form.Text>
				
				<Form.Group controlId="buyerEmailId">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" onChange={this.usernameChangeHandler} className='form-group' />
					{emailErrorMessage}
				</Form.Group>

				<Form.Group controlId="buyerPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control onChange={this.passwordChangeHandler} type="password" />
					{passwordErrorMessage}
					<br/>
					{authMessage}
				</Form.Group>
				<Form.Group>
					<Button onClick={this.submitLogin} variant="primary" type="submit" block>
						Sign In
					</Button>
				</Form.Group>
				<Form.Group>
					<Button variant="outline-primary" type="submit" href='signup' block>
						Sign Up
					</Button>
				</Form.Group>
			</Form>
			</div>
		);
	}
}

export default Login;
