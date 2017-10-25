import React, { Component } from 'react';

import { Provider } from 'react-redux';
import{ createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import './App.css';
import Scroll from './scroll'
import reducer from './reducer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducer)}>
        <div className="App">
          <Scroll/>
        </div>
      </Provider>
    );
  }
}

export default App;
