import React, {Component} from 'react';
import { Form, Table } from 'react-bootstrap';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {Card, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

import CommentTweet from './CommentTweet';
import ViewReplies from './ViewReplies';
import defaultValues from '../constants/defaultValues';


import '../css/App.css';

class ViewTweetsWithTags extends Component {

    constructor(){
        super();
        this.state = {
            searchTweetsList : []
        }
    }

    componentDidMount(){
        
        // axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubUserToken');

        let reqData = {
            hashTag : localStorage.getItem("twitterTagSearch")
        }

        axios.post(defaultValues.serverURI + "/tweets/getTweetsWithTag", reqData)
            .then(response => {
                console.log("Response is : " + JSON.stringify(response, null, 4));
                // let users = response.data;
                
                this.setState({
                    searchTweetsList : response.data.tweets
                });
            });
    }

    // followUser = (event) => {
    //     event.preventDefault();

    //     let newFollowing = event.target.id;
    //     console.log("New Following ===> ");
    //     console.log(newFollowing);

    //     let reqData = {
    //         follow : newFollowing
    //     }

    //     axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');

    //     axios.post("http://localhost:3001/users/follow", reqData)
    //         .then( response => {
    //             console.log("Response is : " + JSON.stringify(response));

    //             if(response.status == 200){
    //                 let error = response.data.error;
    //                 if (!error){
    //                     alert("following " + newFollowing.toString());
                        
    //                 } else {
    //                     alert("Failed to follow " + newFollowing.toString());
    //                 }
    //             }
    //         });
    // }

    getTweets = () => {
        let searchTweetsList = this.state.searchTweetsList;

        if (searchTweetsList.length == 0){
            return (
                <tr>
                    <td colSpan='4'>No Results</td>
                </tr>
            );
        } else {
            let tweetsWithTags = [];

            for(let i = 0; i < searchTweetsList.length; i++){
                let tweetsList = searchTweetsList[i].tweets;
                for(let j = 0; j < tweetsList.length; j++){

                    tweetsWithTags.push(Object.assign(tweetsList[j], {username : searchTweetsList[i].username}));
                }
            }
            console.log("tweetsWithTags ===> ");
            console.log(JSON.stringify(tweetsWithTags));
            

            let tweets = tweetsWithTags.map((tweet) => {
                return (
                    <Card id="tweet" bottom >
                        <CardBody>
                        <CardTitle style={{
                            textAlign: 'left',
                            fontSize:'20px'}}><Link to="/DisplayProfile" username={tweet.username}>@{tweet.username}</Link></CardTitle>
                        <CardText style={{
                            fontSize:'20px'}}>{tweet.content}</CardText>
                        <CardText style={{
                            textAlign:'left',
                            fontSize:'14px'
                        }}>
                        <small className="text-muted">{tweet.likeCount}</small>
                        </CardText>
                        </CardBody>
                        <img bottom src={tweet.image} width="500" height="300"/>
                        {/* <img bottom src={tweet} width="500" height="300" alt="Card image cap" /> */}
                        <CommentTweet tweet={tweet} username={tweet.username}/>
                        <ViewReplies tweet={tweet} username={tweet.username}/>
                    </Card>
                );

            });
            return tweets;

            // let users = searchTweetsList.map((tweet) => {
                
                
            //     return (
            //         <tr>
            //             <td>{user["username"]}</td>
            //             <td>{user["firstName"]}</td>
            //             <td>{user["lastName"]}</td>
            //             <td><Button variant="primary" onClick={this.followUser} id={user["username"]}>Follow</Button></td>
            //         </tr>
            //     );
            // });
            // return users;
        }
    }
	
	render() {
        
        let tweets = this.getTweets();
        
        return(
            <div className="offset-sm-3 col-sm-6">
                {tweets}
			</div>
        );
        
	}
}

export default ViewTweetsWithTags;
