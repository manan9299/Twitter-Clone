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

const ViewReplies = (props) => {
    
    const [show, setShow] = useState(false);
    const [replies, setReplies] = useState([]);
    const [tweet, setTweet] = useState('');
    const [username, setUsername] = useState('');
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    /*const onEmojiClick = (e, emojiObject) => {
        setChosenEmoji(emojiObject);
    }*/

    useEffect(() => {
        axios.get(defaultValues.serverURI+'/tweets/viewReplies/'+props.username+'/'+props.tweet._id)
            .then(res => {
                if (res.status === 200) {
                    console.log("Replies");
                    setReplies(0);
                    console.log(replies);
                }
            }).catch((err) => {
                console.log(err);
            });
            setUsername(props.username);
            setTweet(props.tweet.content);
    });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                View Replies
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Replies </Modal.Title>
                    <div>
                        <div>Username: {username} </div>
                        <div>Tweet content: {tweet} </div>
                    </div>
                </Modal.Header>
                <Modal.Body style={{'max-height': 'calc(100vh - 210px)', 'overflow-y': 'auto'}}>
                    <div>
                        <p>{replies}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ViewReplies;