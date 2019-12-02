import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

function GetTweets(){
    const[tweetsLoaded,setTweetsLoaded] = useState([]);

    useEffect(()=>{
        getTweets();
    },[]);
    
    function getTweets(){
        const data ={
            start : this.state.tweetsLoadedCnt
        }
        Axios.get(defaultValues.serverURI+"/users/getAllTweets",data)
        .then((res)=>{
            
            if(res){
                this.setState({
                    tweetsLoaded : [...this.state.tweetsLoaded,...res.data]
                });
                console.log(this.state.tweetsLoaded);
                this.setState({
                    tweetsLoadedCnt : this.state.tweetsLoadedCnt + 10
                })
            }   
        }).catch(err=>{
            console.error(err);
            console.log("API not Working");
        })
    }
    
}