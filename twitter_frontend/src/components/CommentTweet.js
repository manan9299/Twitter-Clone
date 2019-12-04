import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { MDBBtn, MDBIcon } from "mdbreact";
import axios from 'axios';
import defaultValues from '../constants/defaultValues';


const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

const CommentTweet = (props) => {
    
    const [show, setShow] = useState(false);
    const [img, setImg] = useState('');
    const [reply, setReply] = useState("Tweet your reply");
    //useState(0) will be replaced with existing likes from db
    const [likes, setLikes] = useState(0);
    const [update, setUpdate] = useState(false);
    const [tweet, setTweet] = useState('');
    const [username, setUsername] = useState('');
    //const [chosenEmoji, setChosenEmoji] = useState(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
    }*/

    useEffect(() => {
       
        /*
        axios.get(defaultValues.serverURI+'/users/getTweet')
            .then(res => {
                if (res.status === 200) {
                    tweets = [...res.data.tweets]
                    console.log(tweets);
                    setUsername(res.data._id);
                    setTweets(res.data.tweets[8].content);
                    setImg(res.data.tweets[8].image);
                    setLikes(res.data.tweets[8].likeCount);
                }
            }).catch((err) => {
                console.log(err);
            });*/
            setUsername(props.username);
            setTweet(props.tweet.content);
            setImg(props.tweet.image);
            setLikes(props.tweet.likeCount);
            
    });

    const handleReplyTweet = async (e) => {
        e.preventDefault();

        axios.post(defaultValues.serverURI+'/tweets/replyTweet',{username:props.username,tweetId:props.tweet._id,content:reply})
            .then(res => {

                setShow(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleUpdateLikes = () => {
        axios.post(defaultValues.serverURI+'/tweets/updateLikes', { likes: likes, username:props.username})
            .then(res => {
                console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    const updateLikes = () => {
        if (!update) {
            setLikes(likes + 1);
            setUpdate(true);
            handleUpdateLikes();
        } else {
            setLikes(likes - 1);
            setUpdate(false);
            handleUpdateLikes();
        }
    }

    return (
        <>
            
            <Button variant="primary" onClick={handleShow}>
                Reply or Like
            </Button>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Reply Tweet</Modal.Title>
                    <div>
                        <div>Username: {username} </div>
                        <div>Tweet content: {tweet} </div>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={img} width="465" height="250" alt="No image exists" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div class="form-group">
                        <textarea class="form-control"
                            id="tweet_content"
                            rows="3"
                            name="reply"
                            placeholder={reply}
                            minLength="1"
                            maxLength="280"
                            onChange={e => setReply(e.target.value)}
                            required>
                        </textarea>
                    </div>
                    <div style={styles}>
                        <p onClick={updateLikes}>
                            <MDBIcon icon="heart" />
                            {likes}
                        </p>
                    </div>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleReplyTweet}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default CommentTweet;