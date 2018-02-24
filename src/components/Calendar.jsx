import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import axios from 'axios';
// import sendEmail from '../notification/sendEmail.jsx';


class Calendar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id="calendar">
      </div>
    );
  }

  selectShifts() {
    let numShifts = 0;
    let shifts = [];
    return event => {
      if (numShifts > 0) {
        shifts[1] = event.title;
        console.log(event);
        alert(`${shifts[1]} would like to swap shifts with ${shifts[0]}`);
        // location.href = "/request-shift-swap";
      } else {
        numShifts++;
        shifts[0] = event.title;
        console.log(event);
      }
    };
  }

  componentDidMount() {
    axios.get('/auth/user').then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				console.log('THERE IS A USER');
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});

    let shiftSelector = this.selectShifts();

    $('#calendar').fullCalendar({
      events : [
      {
        title  : 'Joe',
        start  : '2018-02-22T12:30:00',
        allDay : false // will make the time show
      },
      {
        title  : 'Jake',
        start  : '2018-02-23T12:30:00',
        allDay : false // will make the time show
      },
      ],
      defaultView: "basicWeek",
      height: 650,

      // defaultView: "agendaWeek",

      eventMouseover: function (calEvent, jsEvent, view) {
        $(this).css('background-color', 'red');
      },
      eventClick: function (calEvent, jsEvent, view) {
        shiftSelector(calEvent);
        // alert('Would you like to request shift trade for {person name and shift date here} ?');
      },
      dayClick: function(date, jsEvent, view) {
        alert('Clicked on: ' + date.format());
        // change the day's background color just for fun
        $(this).css('background-color', 'orange');
      }

    });
  }
}

export default Calendar;
