import React, {Component} from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

import SearchUser from './SearchUser';
import UsersList from './UsersList';

import '../css/App.css';

class App extends Component {

  render() {
    
    return (
      <BrowserRouter>
        <div>
          {/* <CommonNavbar /> */}
          {/* replace path / with Home Component */}
          <Route path="/" component={SearchUser}/>
          <Route path="/usersList" component={UsersList}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
