import React from 'react'
// TODO - add proptypes

const Header = props => {
	let Greeting
	if (props.user === null) {
		Greeting = <p className="anon-greeting">Hello guest</p>
	} else if (props.user.firstName) {
		Greeting = (
			<p className="greeting">
				Welcome back, <strong>{props.user.firstName}</strong>
			</p>
		)
	} else if (props.user.local.username) {
		Greeting = (
			<p className="greeting">
				Welcome back, <strong>{props.user.local.username} </strong>
			</p>
		)
	}
	return (
		<div className="Header">
			{Greeting}
		</div>
	)
}

export default Header
