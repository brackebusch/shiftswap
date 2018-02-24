import React, { Component } from 'react';
import NavBar from './components/NavBar.jsx';
import Main from './components/Main.jsx';

class App extends Component {
	render() {
		return (
			<div className="app-container">
				<NavBar />
			</div>
		);
	}
}

export default App;
