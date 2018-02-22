import React, { Component } from 'react';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';

//this needs to be set up to render gif unless user is signed in
//and if they are signed in to render the calendar + user info
const DisplayMain = props => {

    return (
      <div className="userAndCalendar">
        <Profile />
        <Calendar />
      </div>  
    )

    //if else statement should wrap around these two return statements
    //checking to see if someone is logged in or not
    // return (
    //   <div className="gif">
    //     <h2>**Jif of a Gif showing the Dif**</h2>
    //     <h4>Not logged in</h4>
    //   </div>
		// )
}

class Main extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className="main-content">
        <DisplayMain />
      </div>
    );
  }
}

export default Main;
