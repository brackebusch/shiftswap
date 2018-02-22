const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')
const User = require('../db/models/user')


// this route is used to return a workplace if none is found it is added
// then a new workplace is added
router.get('/find', (req, res, next) => {
  const { name, place_id, formatted_address, employee_id  } = req.body  
	console.log('===== workplace!!======')
  console.log(req)

  Workplace.findOne({ 'place_id': place_id }).exec( function(err, workplaceMatch) {
    if (err) {
      return res.json(err)
    } else if (workplaceMatch) {
      workplaceMatch.populate("employees")
      return res.json(workplaceMatch)
    } else {      
      const newWorkplace = new Workplace({
        name: name,
        formatted_address: formatted_address,
        place_id: place_id,
      })
      newWorkplace.employees.push(employee_id)
      newWorkplace.save((err, savedWorkplace) => {
        if (err) return res.json(err)
        return res.json(savedWorkplace.populate("employees"))
      })    
    } 
  })
})



router.post('/new', (req, res, next) => {
  const { name, place_id, formatted_address, employee_id  } = req.body  
  const newWorkplace = new Workplace({
    name: name,
    formatted_address: formatted_address,
    place_id: place_id,
  })

  newWorkplace.employees.push(employee_id)
  newWorkplace.save((err, savedWorkplace) => {
    debugger
    if (err) return res.json(err)
    return res.json(savedWorkplace)
  })

})


router.post('/addemployee', (req, res, next) => {
  const { place_id, employee_id  } = req.body 
  Workplace.findOne({ 'place_id': place_id }).exec( function(err, workplaceMatch) {
    if (err) {
      return res.json(err)
    } else if(workplaceMatch)
      workplaceMatch.employees.push(employee_id)

      workplaceMatch.save(function (err, response) {
        if (err) return handleError(err);
        res.send(response.opopulate("employees"));
      });

      // workplaceMatch.save
      // workplaceMatch.populate("employees")
      // return res.json(workplaceMatch)
    })
})

router.patch('/removeemployee', (req, res, next) => {
  const { place_id, employee_id  } = req.body 
  Workplace.findOne({ 'place_id': place_id }).exec( function(err, workplaceMatch) {
    if (err) {
      return res.json(err)
    } else if(workplaceMatch)
      User.findOne({"id": employee_id}).exec( function(err, userMatch) {
        userMatch.workplace = null;
        userMatch.save
      })

      index = workplaceMatch.employees.indexOf(employee_id);
      if (index > -1) {
        workplaceMatch.splice(index, 1);
      } 
      workplaceMatch.populate("employees")
      return res.json(workplaceMatch)
    })
})

router.patch('/addshift', (req, res) => {
	const { shift, place_id } = req.body
  Workplace.findOneAndUpdate( { 'place_id': place_id }, 
    { "$push": { "shifts": shift } }
  ).exec( function(err, workplaceMatch) {
  return res.json(workplaceMatch)
  })
})

module.exports = router