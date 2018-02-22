import React, { Component } from 'react';
import './styling/App.css';
import './styling/welcome.css';
import './styling/Main.css';
import './styling/Calendar.css';
import './styling/Profile.css';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';

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

export default App;
