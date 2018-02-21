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
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      editable: true,
      droppable: true,
      drop: () => {
        if ($('#drop-remove').is('checked')) {
          $(this).remove();
        }
      }
    });
  }
}

export default Calendar;
