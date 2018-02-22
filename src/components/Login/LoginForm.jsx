import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
// import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_disabled_web.png'
import googleButton from './google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

class LoginForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			redirectTo: null
		}
		// this.googleSignin = this.googleSignin.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.closeModal = this.closeModal.bind(this)
		console.log(this.state);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log('handleSubmit')
		
		this.props._login(this.state.email, this.state.password)
		this.setState({
			redirectTo: '/'
		})
	}

	closeModal(event) {
		if (event.target.className === "session-form") {
			this.setState({
				redirectTo: '/'
			})
		}
	}


	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		} else {
			return (
				<div className="session-form" onClick={this.closeModal}>
					<div className="LoginForm">
						<h1 className="LoginHeader">Login</h1>
						<label className="form-label" htmlFor="email">Email: </label>
						<input
							className="form-input"
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/>
					<label className="form-label" htmlFor="password">Password: </label>
						<input
							className="form-input"
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.handleChange}
						/>
					<button className="form-button" onClick={this.handleSubmit}>Login</button>

						<a className="form-google" href="/auth/google">
							{/* <GoogleButton /> */}

							<img src={googleButton} alt="sign into Google Button" />
						</a>
					</div>
				</div>
			)
		}
	}
}

export default LoginForm
