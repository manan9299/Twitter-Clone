import React, {Component} from 'react';
import Main from './components/Main';
import {BrowserRouter} from 'react-router-dom';
import './App.css';

class App extends Component{
  render(){
    return(
      <div className="App">
        <BrowserRouter>
          <div>
            <Main/>
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
