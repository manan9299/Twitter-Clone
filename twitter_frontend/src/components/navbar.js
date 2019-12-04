import React from 'react';
import PostTweet from './PostTweet';
import '../css/navbar.css';
export default class Navbar extends React.Component {
  render() {
    return (
      <div>
         <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Profile</a></li>
            <li><a href="#">Notifications</a></li>
            <li><a href="#">Messages</a></li>
            <li><a href="#">Settings</a></li>          
        </ul>
      </div>
    );
  }
}