import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import defaultValues from '../constants/defaultValues';
import { MDBBtn, MDBIcon } from "mdbreact";
//import Picker from 'emoji-picker-react';
import axios from 'axios';
import S3FileUpload from 'react-s3';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
};

const PostTweet = () => {
    const [show, setShow] = useState(false);
    const [img, setImg] = useState('');
    const [tweet, setTweet] = useState("What's happening?");
    //useState(0) will be replaced with existing likes from db
    const [likes, setLikes] = useState(0);
    const [update, setUpdate] = useState(false);
    const [tweets, setTweets] = useState('');
    const [username, setUsername] = useState('');
    //const [chosenEmoji, setChosenEmoji] = useState(null);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);


    /*const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
    }*/


    const handlePostTweet = async (e) => {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('grubhubToken');
        
        axios.post(defaultValues.serverURI+'/tweets/postTweet', { content: tweet, imageUrl: img})
            .then(res => {
                setShow(false);
            }).catch((err) => {
                console.log(err);
            });
    }

    const uploadImage = async (e) => {
        S3FileUpload
            .uploadFile(e.target.files[0], config)
            .then(data => setImg(data.location))
            .catch(err => console.error(err))
    }

    const handleUpdateLikes = (num) => {
        axios.post(defaultValues.serverURI+'/updateLikes', { likes: likes + num })
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
            handleUpdateLikes(1);
        } else {
            setLikes(likes - 1);
            setUpdate(false);
            handleUpdateLikes(-1);
        }
    }

    return (
        <div>
            
            <Button variant="primary" onClick={handleShow}>
                Tweet 
            </Button>
                
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Post a tweet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div class="form-group">
                            <textarea class="form-control"
                                id="tweet_content"
                                rows="3"
                                name="tweet"
                                placeholder={tweet}
                                minLength="1"
                                maxLength="280"
                                onChange={e => setTweet(e.target.value)}
                                required>
                            </textarea>
                        </div>
                        <div>
                            <img src={img} width="465" height="250" alt="Please upload an image for preview." />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div>
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Upload an image</label>
                                    <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={uploadImage} />
                                </div>
                            </form>
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
                        <Button bsPrefix="nav-link font-weight-bold" variant="primary" onClick={handlePostTweet}>
                            Tweet
                        </Button>
                    </Modal.Footer>
                </Modal>
            
        </div>

    )
};

export default PostTweet;
