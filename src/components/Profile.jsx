import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.showSearch = this.showSearch.bind(this);
    this.recordWorkplace = this.recordWorkplace.bind(this);
  }

  componentDidMount() {
    const google = window.google;
    const ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    var that = this;
    google.maps.event.addListener(ac, 'place_changed', function() {
      var place = ac.getPlace();
      that.setState({
        formatted_address: place.formatted_address,
        url: place.url,
        place_id: place.place_id,
        name: place.name
      })
      // console.log(place.formatted_address);
      // console.log(place.url);
      // console.log(place.place_id);
      // console.log(place.name);
    })
  }

  recordWorkplace() {
    //send state to backend
    console.log(this.state);
  }



  showSearch() {
    console.log("hi");
    document.getElementById('find-workplace').style.display = "flex";
    document.getElementById('add-workplace-button').style.display = "none";
  }

  render() {
    return (
      <div className="user-content">
        <div className="user-info">
            Person Name
            <br/>
            Work Name
            <br/>
            Work Address
            <br/>
        </div>

          <br/>
            <button id="add-workplace-button" onClick={() => this.showSearch()}> Add Workplace</button>
          <br/>

          <br/>
        <div id="find-workplace">
          <label>
            Where Do You Work?
            <input id="autocomplete" type="text" />
          </label>
          <br/>
          <button id="confirm-workplace-button" onClick={() => this.recordWorkplace()}> Confirm Workplace</button>
          <br/>
        </div>
      </div>
    );
  }
}

export default Profile;
