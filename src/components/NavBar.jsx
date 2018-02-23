import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link } from 'react-router-dom'
import LoginForm from './Login/LoginForm.jsx'
import SignupForm from './SignupForm.jsx'
import Main from './Main.jsx';


const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
			 <ul className="nav">
				<div className="left-nav">
					<li className="nav-item">
						<h1>
							ShiftSwap
						</h1>
					</li>
				</div>
				<div className="right-nav">
					<li className="nav-item">
						<Link to="#" onClick={props._logout}>
							Logout
						</Link>
					</li>
				 </div>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<div className="left-nav">
						<li className="nav-item">
							<h1>
								ShiftSwap
							</h1>
						</li>
					</div>
					<div className="right-nav">
						<li className="nav-item">
							<Link to="/login" className="nav-link">
								login
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/signup" className="nav-link">
								sign up
							</Link>
						</li>
					</div>
				</ul>
			</nav>
		)
	}
}

class NavBar extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_login(email, password) {
		axios
		.post('/auth/login', {
				email,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
		<div className="Full-Page">
			<div className="NavBar">

				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Route
					exact
					path="/login"
					render={() =>
						<LoginForm
							_login={this._login}
							_googleSignin={this._googleSignin}
						/>}
				/>
				<Route exact path="/signup" component={SignupForm} />
				{/* <LoginForm _login={this._login} /> */}
			</div>
			<Main loggedIn={this.state.loggedIn} user={this.state.user} />
		</div>
		)
	}
}

export default NavBar
