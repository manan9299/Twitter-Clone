import React, { Component, useEffect, useState } from "react";
import Navbar from './navbar';
import "../css/home.css";
import {Link} from 'react-router-dom';
import defaultValues from "../constants/defaultValues";
import {Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import Axios from "axios";
import InfiniteScroll from 'react-infinite-scroller'

class Home extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            username : "batchUser1", // TODO:: change this later 
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
        console.log(data.start);
        
        Axios.get(defaultValues.serverURI+"/users/batchUser1/getTweets/"+this.state.tweetsLoadedCnt.toString(),)
        .then((res)=>{
            console.log(res)
            if(res){
                this.setState({
                    tweetsLoaded : [...this.state.tweetsLoaded,...res.data],
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
                        <Navbar/>
                    </div>
                    <div>
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
                                <Card id="tweet" bottom width="100%">
                                    <CardBody>
                                    <CardTitle ><Link to="/DisplayProfile" username={this.state.username}>{this.state.username}</Link></CardTitle>
                                    <CardText>{tweetObj.content}</CardText>
                                    <CardText>
                                        <small className="text-muted"></small>
                                    </CardText>
                                    </CardBody>
                                    <img bottom  src="/images/Madtitan.jpg" width="500" height="300" alt="Card image cap" />
                                </Card>
                            ))}
                
                        </InfiniteScroll>
                        </div>
                        
                    </div>
                     
                </div>

        );
    }

}


export default Home;