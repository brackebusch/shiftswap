import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';

const DisplayMain = props => {
      var display = null
      props.loggedIn ? display = (
        <div className="userAndCalendar">
          <Profile user={props.user}/>
          <Calendar user={props.user}/>
        </div> ) : display = null
      return display
}

class Main extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="main-content">
        <DisplayMain loggedIn={this.props.loggedIn} user={this.props.user}/>
      </div>
    );
  }
}

export default Main;
