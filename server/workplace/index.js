const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')
const User = require('../db/models/user')

// this route is used to return a workplace if none is found it is added
// then a new workplace is added
router.get("/find", (req, res, next) => {
  let place_id = req.query.place_id;
  console.log("=====REQUEST SENT====");
  
  console.log(req.query.place_id);
  console.log(place_id);
  
  Workplace.
    findOne({ 'place_id': place_id }).
    populate("employees").
    exec( function (err, workplaceMatch) {
      if (err) {
        console.log("====ERR====");      
        return res.json(err)
      } else if (workplaceMatch) {
        console.log("====FINDING WORKPLACE====");
        return res.json(workplaceMatch)
      } else {
        console.log("====NOTHING FOUND====");        
        return res.json(null);
      }
  })
})

router.post('/addemployee', (req,res,next) => { 
  console.log(req.body);
  const { name, place_id, formatted_address, employee_id  } = req.body  
  
  Workplace.
    findById(place_id).
    populate("employees").
    exec(function (err, result) {
      if (result) {
        console.log("===WORKPLACE EXISTS==");
        console.log(result);
        result.employees.push(employee_id)
        result.save((err, savedWorkplace) => {
          if (err) return res.json(err)
          return res.json(savedWorkplace)
        })
      } else {
        const newWorkplace = new Workplace({
          name: name,
          formatted_address: formatted_address,
          place_id: place_id,
          employees: [employee_id],
          shifts: []
        })
        newWorkplace.save((err, savedWorkplace) => {
          if (err) return res.json(err)
          return res.json(savedWorkplace.populate('employees'))
        })
      }
 
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


// else {      
//   const newWorkplace = new Workplace({
//     name: name,
//     formatted_address: formatted_address,
//     place_id: place_id,
//   })
//   newWorkplace.employees.push(employee_id)
//   newWorkplace.save((err, savedWorkplace) => {
//     if (err) return res.json(err)
//     return res.json(savedWorkplace.populate("employees"))
//   })    
// } 


// router.post('/new', (req, res, next) => {
//   const { name, place_id, formatted_address, employee_id  } = req.body  
//   const newWorkplace = new Workplace({
//     name: name,
//     formatted_address: formatted_address,
//     place_id: place_id,
//   })

//   newWorkplace.employees.push(employee_id)
//   newWorkplace.save((err, savedWorkplace) => {
//     debugger
//     if (err) return res.json(err)
//     return res.json(savedWorkplace.populate('employees'))
//   })

// })


// router.post('/addemployee', (req, res, next) => {
//   const { place_id, employee_id  } = req.body 
//   Workplace.findOne({ 'place_id': place_id }).exec( function(err, workplaceMatch) {
//     if (err) {
//       return res.json(err)
//     } else if(workplaceMatch)
//       workplaceMatch.employees.push(employee_id)

//       workplaceMatch.save(function (err, response) {
//         if (err) return handleError(err);
//         res.send(response.populate("employees"));
//       });

//       // workplaceMatch.save
//       // workplaceMatch.populate("employees")
//       // return res.json(workplaceMatch)
//     })
// })
