import React, {Component} from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

import SearchUser from './SearchUser';
import Login from './Login';
import Home from './Home';
import CommonNavbar from './CommonNavbar';
import SignUp from './SignUp';
import UsersList from './UsersList';
import UserTweets from './UserTweets';
import FindHastTags from './FindHastTags';
import ViewTweetsWithTags from './ViewTweetsWithTags';
import MessageInbox from './MessageInbox';
import SendMessage from './SendMessage';

import '../css/App.css';

class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <div>
          {/* <CommonNavbar /> */}
          {/* replace path / with Home Component */}
          <Route path="/" component={CommonNavbar}/>
          <Route path="/login" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/signUp" component={SignUp}/>
          <Route path="/searchUser" component={SearchUser}/>
          <Route path="/searchUserList" component={UsersList}/>
          <Route path="/viewUserTweets" component={UserTweets}/>
          <Route path="/findHashTags" component={FindHastTags}/>
          <Route path="/viewTweetsHavingTags" component={ViewTweetsWithTags}/>
          <Route path="/messageInbox" component={MessageInbox}/>
          <Route path="/messageUser/:id" component={SendMessage} />
          {/* <Route path="/signUp" component={SignUp}/> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
