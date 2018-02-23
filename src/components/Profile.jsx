import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.showSearch = this.showSearch.bind(this);
    this.recordWorkplace = this.recordWorkplace.bind(this);
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    const google = window.google;
    const ac = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
    var that = this;
    var place = null;
    google.maps.event.addListener(ac, 'place_changed', function() {
      place = ac.getPlace();
      that.setState({
        formatted_address: place.formatted_address,
        url: place.url,
        place_id: place.place_id,
        name: place.name
      });
      // console.log(place.formatted_address);
      // console.log(place.url);
      // console.log(place.place_id);
      // console.log(place.name);
      var info = document.getElementById("confirm-modal-info");
      info.innerText = `${place.name} \n
                        ${place.formatted_address}
      `;
      document.getElementById('confirm-modal-back').style.display = "flex";
      document.getElementById('confirm-modal').style.display = "flex";
    });


  }

  recordWorkplace() {
    //send state to backend
  }

  closeModal(event) {
		if (event.target.id === "confirm-modal-back") {
			document.getElementById('confirm-modal-back').style.display = "none";
		}
	}



  showSearch() {
    document.getElementById('find-workplace').style.display = "flex";
    document.getElementById('add-workplace-button').style.display = "none";
  }

  render() {
    console.log(this.props);

    return (
      <div className="user-content">
        <div className="user-info">
            {this.props.user.local.email}
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
        </div>
        <div id="confirm-modal-back" onClick={this.closeModal}>
          <div id="confirm-modal">
            <div id="confirm-modal-info">

            </div>
            <button id="confirm-workplace-button" onClick={() => this.recordWorkplace()}> Confirm Workplace</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
