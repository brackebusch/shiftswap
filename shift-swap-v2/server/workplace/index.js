const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')

// this route is just used to get the workplace basic info
router.get('/workplace', (req, res, next) => {
	console.log('===== workplace!!======')
	console.log(req.workplace)
	if (req.workplace) {
		return res.json({ workplace: req.workplace })
	} else {
		return res.json({ workplace: null })
	}
})

router.post('/signup', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'local.username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'local.username': username,
			'local.password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})

module.exports = router
