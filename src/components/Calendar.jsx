import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';

class Calendar extends Component {
  render() {
    return (
      <div id="calendar">
      </div>
    );
  }

  componentDidMount() {
    $('#calendar').fullCalendar({
      // header: {
      //   left: 'prev,next today',
      //   center: 'title',
      //   right: 'month,agendaWeek,agendaDay'
      // },
       events : [
        {
          title  : 'event1',
          start  : '2018-02-21T12:30:00',
          allDay : false // will make the time show
        },
        {
          title  : 'event2',
          start  : '2018-02-22T12:30:00',
          allDay : false // will make the time show
        },
       ],
       editable: true,
       droppable: true,
       allDaySlot: false,
      // drop: () => {
      //   if ($('#drop-remove').is('checked')) {
      //     $(this).remove();
      //   }
      // }
      defaultView: "agendaWeek"
    });
  }
}

export default Calendar;
