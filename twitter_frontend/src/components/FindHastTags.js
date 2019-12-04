import React, {Component} from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import {Redirect} from 'react-router';

import '../css/App.css';

class FindHastTags extends Component {

	constructor(){
		super();
		this.state = {
			tagname : "",
			toTweetsList : null,
			submitMessage : ""
		}
	}

	searchTweets = (event) => {
		event.preventDefault();
		let tagname = this.state.tagname;

		// axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');
		localStorage.setItem('twitterTagSearch', tagname);
		this.setState({
			toTweetsList : <Redirect to='/viewTweetsHavingTags' />
		})
	}

	searchChangeHandler = (event) => {
		this.setState({
			tagname : event.target.value
		})
	}
	
	render() {
		
        return(
            <div className="offset-sm-4 col-sm-3">
				{this.state.toTweetsList}
				<Form inline>
					<Form.Group style={{ marginTop: '20px'}}>
						<Form.Control onChange={this.searchChangeHandler} placeholder='Search Tags' className='form-group' type="text" />
					</Form.Group>
					<Form.Group style={{ marginTop: '20px', marginLeft: '20px'}} >
						<Button onClick={this.searchTweets} variant="primary" block>
							Find
						</Button>
					</Form.Group>
				</Form>
			</div>
        );
        
	}
}

export default FindHastTags;
