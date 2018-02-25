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
		start: { type: Date, unique: false },
		end: { type: Date, unique: false },				
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


// item.save(function(err, item) {
// 	Item.findOne(item).populate('comments.created_by').exec(function (err, item) {
// 			res.json({
// 					status: 'success',
// 					message: "You have commented on this item",
// 					comment: item.comments.id(comment._id)
// 			});
// 	});
// });

// Model.findById(id, function (err, doc) {
//   if (err) ..
//   doc.name = 'jason bourne';
//   doc.save(callback);
// });