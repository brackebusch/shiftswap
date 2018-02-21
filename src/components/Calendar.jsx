import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import '../styling/fullcalendar.min.css';
import '../styling/fullcalendar.print.min.css';


class Calendar extends Component {
  render() {
    return (
      <div id="calendar">
      </div>
    );
  }

  componentDidMount() {
    $('#calendar').fullCalendar({
      events : [
      {
        title  : 'Joe',
        start  : '2018-02-21T12:90:00',
        allDay : false // will make the time show
      },
      {
        title  : 'Jake',
        start  : '2018-02-22T12:90:00',
        allDay : false // will make the time show
      },
      ],
      defaultView: "basicWeek",
      // defaultView: "agendaWeek",
      
      eventMouseover: function (calEvent, jsEvent, view) { 
        $(this).css('background-color', 'red');
      }, 
      eventClick: function (calEvent, jsEvent, view) {
        alert('Would you like to request shift trade for {person name and shift date here} ?')
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
