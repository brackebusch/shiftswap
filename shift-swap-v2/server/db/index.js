/* Mongo Database
* - this is where we set up our connection to the mongo database
*/
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://brackebusch:christmas@ds239648.mlab.com:39648/shift-swap'
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_URL}`
	)
})

module.exports = db
