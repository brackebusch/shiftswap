const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define workplaceSchema
const workplaceSchema = new Schema({
	name: { type: String, unique: false },
	formatted_address: { type: String, unique: false },
  place_id: { type: String, unique: true },
	employees: [{type : Schema.ObjectId, ref: 'User', unique: true }],
	shifts: [
		{ employee_id: {type : Schema.ObjectId, ref: 'User'},
		title: { type: String, unique: false },
		start: { type: Date, unique: false },
		end: { type: Date, unique: false },
		backgroundColor: { type: String },
		editable: false				
		}
	]
})

// Define schema methods
workplaceSchema.methods = {
	tradeShift: function(week, shiftToTake, shiftToGive) {
		return true
	}
}

// Create reference to Workpalce & export
const Workplace = mongoose.model('Workplace', workplaceSchema)

module.exports = Workplace