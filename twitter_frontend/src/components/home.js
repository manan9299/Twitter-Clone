import React, { Component, useEffect, useState } from "react";
import Navbar from './navbar';
import "../css/home.css";
import {Redirect}  from 'react-router';
import defaultValues from "../constants/defaultValues";
import { Col,Row,FormGroup,Form,Label, Input, Card, Button, CardImg, CardTitle, CardText, CardDeck,
    CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import Axios from "axios";
import InfiniteScroll from 'react-infinite-scroller'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            tweetsLoaded: [],
            tweetsLoadedCnt:0,
            isLoading: true,
            cursor: 0
          };
          this.getTweets = this.getTweets.bind(this);
          this.scrollDownEvent = this.scrollDownEvent.bind(this);
    }
    

    componentDidMount(){
        //this.loadTweets(); 
        this.getTweets();
        
    }
    componentWillMount(){
        window.addEventListener('scroll',()=>{
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                console.log("you're at the bottom of the page");
                //show loading spinner and make fetch request to api
                this.getTweets();
             }
        });
    }
    
    scrollDownEvent(){
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            //show loading spinner and make fetch request to api
            this.getTweets();
         }
    }

    
    getTweets(){
        const data = {
            start : this.state.tweetsLoadedCnt
        }
        console.log(data.start);
        Axios.get(defaultValues.serverURI+"/users/getAllTweets/"+this.state.tweetsLoadedCnt.toString(),)
        .then((res)=>{
            
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
                                <Card bottom width="100%">
                                    <CardBody>
                                    <CardTitle>{tweetObj.username}</CardTitle>
                                    <CardText></CardText>
                                    <CardText>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </CardText>
                                    </CardBody>
                                    <CardImg bottom width="100%"  alt="Card image cap" />
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