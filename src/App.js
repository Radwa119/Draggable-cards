import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Styling
import './App.css';
// Components

import CardComponent from './components/sections/CardComponent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <Route exact path="" component={Card} /> */}
          <CardComponent />
        </div>
      </Router>
    );
  }
}

export default App;
