const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')

// this route is used to return a workplace if none is found it is added
// then a new workplace is added
router.get('/workplace', (req, res, next) => {
  const { name, place_id, formatted_address } = req.body
	console.log('===== workplace!!======')
  console.log(req)

  Workplace.findOne({ 'place_id': place_id }, (err, workplaceMatch) => {
    if(workplaceMatch)
    return res.json({ workplace: workplaceMatch})
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

module.exports = router
