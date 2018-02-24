import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile.jsx';
import Calendar from './Calendar.jsx';

//this needs to be set up to render gif unless user is signed in
//and if they are signed in to render the calendar + user info
const DisplayMain = props => {
  var display = null
  if (props.loggedIn) {
    let workplace =
    display = (
      <div className="userAndCalendar">
        <Profile user={props.user}/>
        <Calendar user={props.user}/>
      </div>
    );
} else {
  display = (
    <div className="gif">
    </div> );
}

return display;
                    //probs can enter gif here

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
  constructor(props) {
    super(props)
    console.log(props);
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
