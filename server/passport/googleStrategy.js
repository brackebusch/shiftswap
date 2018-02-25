const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const User = require('../db/models/user')


//Randomly assigns a color to user based on their email
//Called during Save and passed google given email
const stringToColor = function(str) {
	console.log("===COLOR CREATOR====");
	console.log(str);
	
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}

const strategy = new GoogleStrategy(
	{
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: '/auth/google/callback'
	},
	function(token, tokenSecret, profile, email, done) {
		// testing
		console.log('===== GOOGLE PROFILE =======')
		console.log(email)		
		console.log('======== END ===========')
		// code
		const { id, name, photos, emails } = email
		// console.log("===GOOGLE INFORMATION====");

		User.findOne({ 'google.googleId': id }, (err, userMatch) => {
			// handle errors here:
			if (err) {
				console.log('Error!! trying to find user with googleId')
				console.log(err)
				return done(null, false)
			}
			// if there is already someone with that googleId
			if (userMatch) {
				return done(null, userMatch)
			} else {
				// if no user in our db, create a new user with that googleId
				console.log('====== PRE SAVE =======')
				const newGoogleUser = new User({
					'google.googleId': id,
					firstName: name.givenName,
					lastName: name.familyName,
					'local.email': emails.value,
					workplaces: [],
					'color': stringToColor(email.emails[0].value) 
				})
				// save this user
				newGoogleUser.save((err, savedUser) => {
					if (err) {
						console.log('Error!! saving the new google user')
						console.log(err)
						return done(null, false)
					} else {
						return done(null, savedUser)
					}
				}) // closes newGoogleUser.save
				console.log('====== post save ....')
			}
		}) // closes User.findOne
	}
)

module.exports = strategy
