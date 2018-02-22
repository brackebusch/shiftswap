import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class SignupForm extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.closeModal = this.closeModal.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				email: this.state.email,
				password: this.state.password
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
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
		}
		return (
			<div className="session-form" onClick={this.closeModal}>
				<div className="SignupForm">
					<h1 className="SignupHeader">SignUp</h1>
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
				<label className="form-label-confirm" htmlFor="confirmPassword">Confirm Password: </label>
					<input
						className="form-input"
						type="password"
						name="confirmPassword"
						value={this.state.confirmPassword}
						onChange={this.handleChange}
					/>
				<button className="form-button" onClick={this.handleSubmit}>Sign up</button>
				</div>
			</div>
		)
	}
}

export default SignupForm
