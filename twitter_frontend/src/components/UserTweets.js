import React, { Component, useEffect, useState } from "react";
// import Navbar from './navbar';
import PostTweet from './PostTweet';
import "../css/home.css";
import {Link} from 'react-router-dom';
import defaultValues from "../constants/defaultValues";
import {Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import Axios from "axios";
import InfiniteScroll from 'react-infinite-scroller';
import CommentTweet from './CommentTweet';
import ViewReplies from './ViewReplies';

class UserTweets extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            username : "", // TODO:: change this later 
            tweetsLoaded: [],
            tweetsLoadedCnt:0,
            isLoading: true,
            cursor: 0
          };
          this.getUserTweets = this.getUserTweets.bind(this);
          this.scrollDownEvent = this.scrollDownEvent.bind(this);
    }
    

    componentDidMount(){
        //this.loadTweets(); 
        this.getUserTweets();
        
    }
    componentWillMount(){
        window.addEventListener('scroll',()=>{
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("you're at the bottom of the page");
                //show loading spinner and make fetch request to api
                this.getUserTweets();
             }
        });
    }
    
    scrollDownEvent(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            //show loading spinner and make fetch request to api
            this.getUserTweets();
         }
    }

    
    getUserTweets(){
        const data = {
            start : this.state.tweetsLoadedCnt
        }
        Axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
        Axios.get(defaultValues.serverURI+"/tweets/getTweets/"+this.state.tweetsLoadedCnt.toString())
        .then((res)=>{
            console.log(res)
            if(res){
                this.setState({
                    username : res.data.username,
                    tweetsLoaded : [...this.state.tweetsLoaded,...res.data.tweets],
                    tweetsLoadedCnt : this.state.tweetsLoadedCnt + 10
                });
            }   
        }).catch(err=>{
            console.error(err);
            console.log("API not Working");
        })
    }
    render(){
        const {
            error,
            hasMore,
            isLoading,
            tweetsLoaded,
            tweetsLoadedCnt
        } = this.state;
        console.log(tweetsLoaded);
        return(    
                <div className="container">
                    <div>
                       
                    </div>
                    <div>
                    <li><a href="#"><PostTweet/></a></li>
                        <h1>Tweets</h1>
                        <div className="container" id="user_tweets">
                        <InfiniteScroll
                            pageStart={0}
                            hasMore={true || false}
                            useWindow={false}
                            loader={
                            <div key="loading" className="loader">
                                Loading ...
                            </div>
                            }
                        >
                            {tweetsLoaded.map(tweetObj => (
                                <Card id="tweet" bottom >
                                    <CardBody>
                                    <CardTitle style={{
                                        textAlign: 'left',
                                        fontSize:'20px'}}><Link to="/DisplayProfile" username={this.state.username}>@{this.state.username}</Link></CardTitle>
                                    <CardText style={{
                                        fontSize:'20px'}}>{tweetObj.content}</CardText>
                                    <CardText style={{
                                        textAlign:'left',
                                        fontSize:'14px'
                                    }}>
                                    <small className="text-muted">{tweetObj.likesCount}</small>
                                    </CardText>
                                    </CardBody>
                                    <img bottom src={tweetObj.image} width="500" height="300" alt="Card image cap" />
                                    <CommentTweet tweet={tweetObj} username={this.state.username}/>
                                    <ViewReplies tweet={tweetObj} username={this.state.username}/>
                                </Card>
                            ))}
                
                        </InfiniteScroll>
                        </div>               
                    </div>            
                </div>
        );
    }

}


export default UserTweets;