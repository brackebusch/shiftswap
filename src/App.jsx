import React, { Component } from 'react';
// import 'css-loader!./styling/App.css';
// import 'css-loader!./styling/welcome.css';
// import 'css-loader!./styling/Main.css';
// import 'css-loader!./styling/Calendar.css';
// import 'css-loader!./styling/Profile.css';
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
