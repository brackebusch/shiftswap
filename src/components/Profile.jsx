import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'


class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      name: '',
      formatted_address: '',
      place_id: '',
      redirectTo: null
    };
    this.showSearch = this.showSearch.bind(this);
    this.recordWorkplace = this.recordWorkplace.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      var info = document.getElementById("confirm-modal-info");
      info.innerText = `${place.name} \n
                        ${place.formatted_address}`;
      document.getElementById('confirm-modal-back').style.display = "flex";
      document.getElementById('confirm-modal').style.display = "flex";

    });
  }

  // ##### THIS IS WHERE PROFILE CONNECTS TO BACKEND #####

  recordWorkplace() {
    this.closeModal();
    axios
      .post('workplace/addemployee', {
        employee_id: this.props.user._id,
        name: this.state.name,
        formatted_address: this.state.formatted_address,
        place_id: this.state.place_id,
      })
      .then(response => {
        if (!response.data.errmsg) {
          this.setState({
            redirectTo: '/'
          });
        }
      });
  }

  closeModal(event) {
    if (!event) {
      document.getElementById('confirm-modal-back').style.display = "none";
      return;
    }
		if (event.target.id === "confirm-modal-back") {
			document.getElementById('confirm-modal-back').style.display = "none";
		}
	}

  showSearch() {
    document.getElementById('find-workplace').style.display = "flex";
    document.getElementById('add-workplace-button').style.display = "none";
  }

  render() {

    return (
      <div className="user-content">
        <div className="user-info">

           <span>{`${this.props.user.firstName} ${this.props.user.lastName}`}</span>

            <br/>
            <br/>
              {
                this.props.user.workplaces.length ?
                this.props.user.workplaces[0].name : 'add a workplace'
              }
            <br/>
              {
                this.props.user.workplaces.length ?
                this.props.user.workplaces[0].formatted_address : ''
              }
            <br/>
        </div>

          <br/>
            {this.props.user.workplaces.length ? <div></div> :
            <button id="add-workplace-button" onClick={() => {
              this.showSearch();
            }}> Add Workplace</button>
              }
          <br/>

          <br/>
        <div id="find-workplace">
          <label>
            Where do you work?
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
