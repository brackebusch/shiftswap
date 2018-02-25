import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import moment from 'moment';
import axios from 'axios';
// import sendEmail from '../notification/sendEmail.jsx';
var selectDate = ''

class Calendar extends Component{ 
  constructor(props) {
    super(props);
    this.user = this.props.user,
    this.workplaces = this.props.user.workplaces,
    this.state = {
      start: '08:00',
      end: '17:00',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addShift = this.addShift.bind(this);
  }

  componentDidMount() {
    console.log("===display user===");
    console.log(this.state.user);

    $('#calendar').fullCalendar({      
      customButtons: {
        addShiftButton:{
          text: 'Select Day To Add Shift',
          click: function() {
            const modal = document.getElementById('myModal');  
            modal.style.display = "block";
          }
        }
      },
      header: {
        left:   'title',
        center: 'addShiftButton',
        right:  'prev,next'
      },
      defaultView: "agendaWeek",
      height: "parent", 
      dayClick: function(date, jsEvent, view) {
        selectDate = date        

        let moment = date.format("dddd, MMMM Do");
        $('#dateHeader').text(moment);

        let button = $('.fc-addShiftButton-button')
        button[0].disabled = false
        button.removeClass('btn-disabled');
        button[0].textContent = 'Add Shift';  
      },
      events : this.workplaces[0].shifts
    });
    let button = $('.fc-addShiftButton-button')
    button[0].disabled = true
    button.addClass('btn-disabled');    
  }

  addShift(event) {
    console.log(this.user);    
    document.getElementById('myModal').style.display = "none";
    event.preventDefault();
    console.log(selectDate.format("MMMM D YYYY")+this.state.start);

    let shiftStart = new Date((selectDate.format("MMMM D YYYY") + " " + this.state.start + " " + "PST"))
    let shiftEnd = new Date((selectDate.format("MMMM D YYYY") + " " + this.state.end + " " + "PST"))
    console.log(this.state.start);
    console.log(shiftStart);
    
    axios
      .post('workplace/addshift', {
        place_id: this.workplaces[0].place_id,
        shift: {
          employee_id: this.user._id,
          title: (this.user.firstName + this.user.lastName),
          start: shiftStart,
          end: shiftEnd,
          backgroundColor: this.user.backgroundColor,
          textColor: this.user.textColor,
        }
      })
      .then(response => {
        if (!response.data.errmsg) {
          console.log('====database response====');
          console.log(response.data);
          this.setState({
            redirectTo: '/'
          });
        }
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // console.log(value);
    
    this.setState({
      [name]: value
    });
    console.log(this.state.start);
    console.log(this.state.end);    
    
  }

render() {
  if (this.workplaces.length) {
    return (
      <div id="calendar-container">

        <div id="myModal" className="modal">
          {/* -- Modal content -- */}
          <form onSubmit={this.addShift}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close">&times;</span>
                <h3 id="dateHeader">Date Goes Here</h3>
              </div>
              <div className="modal-body">

              <h4>Shift Hours</h4>
              <table className="shift-hours">
              <tbody>
                <tr>
                  <td>
                    Start Time
                  </td>
                  <td>
                    <input name="start" type="time" value={this.state.start} onChange={this.handleInputChange} />
                  </td>
                </tr>
                <tr>
                  <td>
                    End Time
                  </td>
                  <td>
                    <input name="end" type="time" value={this.state.end} onChange={this.handleInputChange} />
                  </td>
                </tr>
              </tbody>
            </table>

              </div>
              <div className="modal-footer">
                <button id="submitShift">Add Shift</button>
              </div>
            </div>
          </form>          
        </div>

        <div id="calendar">
        </div>

      </div>
    );
  } else {
    return (
      <div id="calendar-container">
        <h4>Add a workplace to see shifts!</h4>
      </div>
    ); 
  }
}

}

export default Calendar;

      // Get the modal
      // const modal = document.getElementById('myModal');

      // Get the <span> element that closes the modal
      // const span = document.getElementsByClassName("close")[0];

      // When the user clicks on <span> (x), close the modal
      // span.onclick = function() {
      //     modal.style.display = "none";
      // }

  // When the user clicks anywhere outside of the modal, close it
  // window.onclick = function(event) {
  //     if (event.target == modal) {
  //         const modal = document.getElementById('myModal');        
  //         modal.style.display = "none";
  //     }
  // }

    // let shiftSelector = this.selectShifts();


      // eventClick: function (calEvent, jsEvent, view) {
      //   shiftSelector(calEvent);
      //   alert('Would you like to request shift trade for {person name and shift date here} ?');
      // },

// selectShifts() {
//   let numShifts = 0;
//   let shifts = [];
//   return event => {
//     if (numShifts > 0) {
//       shifts[1] = event.title;
//       console.log(event);
//       alert(`${shifts[1]} would like to swap shifts with ${shifts[0]}`);
//       // location.href = "/request-shift-swap";
//     } else {
//       numShifts++;
//       shifts[0] = event.title;
//       console.log(event);
//     }
//   };
// }