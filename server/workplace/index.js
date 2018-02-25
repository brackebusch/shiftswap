const express = require('express')
const router = express.Router()
const Workplace = require('../db/models/workplace')
const User = require('../db/models/user')

// this route is used to return a workplace if none is found it is added
// then a new workplace is added
router.get("/find", (req, res, next) => {
  let place_id = req.query.place_id;
  console.log("=====REQUEST SENT====");

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
  const { name, place_id, formatted_address, employee_id  } = req.body
  console.log(req.body);

  Workplace.
    findOne({place_id: place_id}).
    exec(function (err, foundWorkpalce) {
      if (err) return res.json(err)
      if (foundWorkpalce) {
        console.log(`===WORKPLACE ${name} EXISTS==`);
        foundWorkpalce.employees.push(employee_id)

        foundWorkpalce.save(function(err, savedWorkplace) {
          if (err) return res.json(err)
          Workplace.findOne(savedWorkplace).populate('employees').exec(function (err,savedWorkplace){
            if (err) return res.json(err)
            User.findByIdAndUpdate(employee_id, {$push: {workplaces: savedWorkplace._id}}).exec(function (err2, savedUser){
              if (err2) return res.json(err2)
              return res.json(savedWorkplace)
            })
          })
        })
      } else {
        console.log("===CREATING WORKPLACE - NONE FOUND==");
        const newWorkplace = new Workplace({
          name: name,
          formatted_address: formatted_address,
          place_id: place_id,
          employees: [employee_id],
          shifts: []
        })

        newWorkplace.save(function(err, savedWorkplace) {
          if (err) return res.json(err)
          Workplace.findOne(savedWorkplace).populate('employees').exec(function (err,savedWorkplace){
            if (err) return res.json(err)
            User.findByIdAndUpdate(employee_id, {$push: {workplaces: savedWorkplace._id}}).exec(function (err2, savedUser){
              if (err2) return res.json(err2)
              return res.json(savedWorkplace)
            })
          })
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

// This is where we'll send emails to request shift swaps

router.post('/request-shift-swap', (req, res) => {
  const { place_id, shift1, shift2, email } = req.body;
  
});

module.exports = router

// router.post('/add', (req, res) => {
//   console.log(req.body);
//   const { name, formatted_address, place_id, user } = req.body;
//   let workplace;
//   // ###### ADDING CONDITIONAL TO SEND TO addemployee #####
//   Workplace.findOne({'place_id': place_id}, (err, workplaceMatch) => {
//     if (workplaceMatch) {
//       workplace = workplaceMatch;
//       console.log('match');
//       return res.json()
//     } else {
//       workplace = new Workplace({
//         'name': name,
//         'formatted_address': formatted_address,
//         'place_id': place_id,
//         'employees': [user],
//         'shifts': []
//       });
//       workplace.save((error, savedWorkplace) => {
//         if (error) return res.json(error);
//         console.log(`saved ${savedWorkplace}`);
//         user.workplace = savedWorkplace._id;
//         console.log(user);
//         return res.json(savedWorkplace);
//       });
//     }
//   })
//   console.log(workplace);
// });


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
