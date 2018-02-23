// Loading evnironmental variables here
if (process.env.NODE_ENV !== 'production') {
	console.log('loading dev environments')
	require('dotenv').config()
}
require('dotenv').config()

const mailer = require('nodemailer')
mailer.createTestAccount((err, account) => {
	let transporter = mailer.createTransport({
		// host: 'smtp.ethereal.email',
		service: 'gmail',
		auth: {
			user: 'shiftswap1@gmail.com',
			pass: 'dylankylearpan'
		}
	});

	let mailOptions = {
		from: '"ShiftSwap" <dmccapes@gmail.com>',
		to: 'dmccapes@mac.com',
		subject: 'Shift change request',
		html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html lang="en" xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>link</title></head><body style="width:100%;margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;"><table width="100%" height="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table width="600" cellpadding="0" cellspacing="0"><tbody><table cellpadding="0" cellspacing="0"><tbody><tr><td><div><span style="font-family:helvetica;font-size:20px;font-weight:bold;line-height:20px;color:black;">Dylan has requested swap shifts:</span></div><div><span style="font-family:helvetica;font-size:20px;font-weight:bold;line-height:20px;color:black;"> 05/10/2018 5:00-7:00 - Dylan</span></div><div><span style="font-family:helvetica;font-size:20px;font-weight:bold;line-height:20px;color:black;"> 05/11/2018 7:00-9:00 - You</span></div><div><button>Accept</button><button>Decline</button></div></td></tr></tbody></table></tbody></table></td></tr></tbody></table></body></html>'
		};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		} else {
			console.log('Message sent: %s', info.messageId);
			console.log('Preview URL: %s', mailer.getTestMessageUrl(info));
		}
	});
});

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: false
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function(req, res, next) {
// 	console.log('===== passport user =======')
// 	console.log(req.session)
// 	console.log(req.user)
// 	console.log('===== END =======')
// 	next()
// })
// testing
// app.get(
// 	'/auth/google/callback',
// 	(req, res, next) => {
// 		console.log(`req.user: ${req.user}`)
// 		console.log('======= /auth/google/callback was called! =====')
// 		next()
// 	},
// 	passport.authenticate('google', { failureRedirect: '/login' }),
// 	(req, res) => {
// 		res.redirect('/')
// 	}
// )


app.use('/public', express.static(path.join(__dirname, '../public')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'))
})

// ==== if its production environment!
// const path = require('path')
if (process.env.NODE_ENV === 'production') {
	console.log('YOU ARE IN THE PRODUCTION ENV')
	// app.use('/static', express.static(path.join(__dirname, '../public')))
	// app.get('/', (req, res) => {
	// 	res.sendFile(path.join(__dirname, 'index.html'))
	// })
} else {
	// ==== if it's development environment

}

/* Express app ROUTING */
app.use('/auth', require('./auth'))
app.use('/workplace', require('./workplace'))

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
