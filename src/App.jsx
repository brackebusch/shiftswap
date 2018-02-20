import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import './styling/App.css';
import './styling/welcome.css';

class App extends Component {
  render() {
    return (
      <div className="app-container">
        <NavBar />
        <Home />
      </div>
    );
  }
}

export default App;
