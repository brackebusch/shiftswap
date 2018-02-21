const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define workplaceSchema
const workplaceSchema = new Schema({
	workplaceName: { type: String, unique: false },
  placeId: { type: String, unique: true },
  shifts: { type : Array , "default" : [] },
	employees: [{ type : Schema.ObjectId, ref: 'User' }]
})

// Define schema methods
workplaceSchema.methods = {
	tradeShift: function(week, shiftToTake, shiftToGive) {
		return true
	}
}

// Create reference to Workpalce & export
const Workplace = mongoose.model('Workpalce', workplaceSchema)
module.exports = Workplace
