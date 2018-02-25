import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';
import emailHTML from './notification/emailHTML.jsx';

class App extends Component {
	render() {
		return (
			<div className="app-container">
				<NavBar />
				<Main />
			</div>
		);
	}
}

// <div>
// 	{emailHTML('Dylan', {
// 		date: '05/10/2018',
// 		start: '7:00',
// 		end: '9:00'
// 	}, {
// 		date: '05/11/2018',
// 		start: '9:00',
// 		end: '11:00'
// 	})}
// </div>

export default App;
