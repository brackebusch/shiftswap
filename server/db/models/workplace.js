const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define workplaceSchema
const workplaceSchema = new Schema({
	name: { type: String, unique: false },
	formatted_address: { type: String, unique: false },
  place_id: { type: String, unique: true },
	shifts: [{ employee: {type : Schema.ObjectId, ref: 'User'}
							
					 }],
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
