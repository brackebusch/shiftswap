const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')

// this route is used to return a workplace if none is found it is added
// then a new workplace is added
router.get('/workplace', (req, res, next) => {
  const { name, place_id, formatted_address } = req.body
	console.log('===== workplace!!======')
  console.log(req)

  Workplace.findOne({ 'place_id': place_id }).populate(employees).
    exec( function(err, workplaceMatch) {
    if(workplaceMatch)
      return res.json(workplaceMatch)
    })

  const newWorkpalce = new Workplace({
    name: name,
    formatted_address: formatted_address,
    place_id: place_id,
  })
  newWorkpalce.save((err, savedWorkplace) => {
    if (err) return res.json(err)
    return res.json(savedWorkplace)
  })
    
})

router.patch('/workplace/update', (req, res) => {
	const { username, shift, place_id } = req.body
  Workplace.findOneAndUpdate( { 'place_id': place_id }, 
    { "$push": { "shifts": shift } }
  ).exec( function(err, workplaceMatch) {
  return res.json(workplaceMatch)
  })
})

module.exports = router
