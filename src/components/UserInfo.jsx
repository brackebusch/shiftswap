import React, { Component } from 'react'
import Profile from './Profile.jsx'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


class UserInfo extends React.Component {
  componentWillMount() {
    const ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    google.maps.event.addListener(ac, 'place_changed', function() {
      var place = ac.getPlace();
      console.log(place.formatted_address);
      console.log(place.url);
      console.log(place.place_id);
      console.log(place.name);    
    })
  }

  render() {
    return (
      <div className="user-content">
          PERSON NAME
          <br/>
          WORK NAME
          <br/>
          WORK ADDRESS
          <br/>
          <br/>
          <br/>
          BUTTON TO 'ADD WORKPLACE' WHICH SHOWS INPUT BOX
          <label>
            Where Do You Work?
            <input id="autocomplete" type="text" />
          </label>
      </div>
    );
  }
}

export default UserInfo;
