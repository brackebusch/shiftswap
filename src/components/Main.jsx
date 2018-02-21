import React, { Component } from 'react';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';

class Main extends Component {
  render() {
    return (
      <div className="main-content">
        <Calendar />
      </div>
    );
  }
}

export default Main;
