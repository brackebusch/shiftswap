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
				<div>
					{emailHTML}
				</div>
			</div>
		);
	}
}

export default App;
