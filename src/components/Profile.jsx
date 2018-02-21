import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


class Profile extends React.Component {
  // componentWillMount() {
  //   const ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  //   google.maps.event.addListener(ac, 'place_changed', function() {
  //     var place = ac.getPlace();
  //     console.log(place.formatted_address);
  //     console.log(place.url);
  //     console.log(place.place_id);
  //     console.log(place.name);    
  //   })
  // }

  render() {
    return (
      <div className="user-content">
          Person Name
          <br/>
          Work Name
          <br/>
          Work Address
          <br/>
          <br/>
          "Add Workplace" link/button which reveals seach box
          <br/>
          <br/>          
          <label>
            Where Do You Work?
            <input id="autocomplete" type="text" />
          </label>
      </div>
    );
  }
}

export default Profile;
