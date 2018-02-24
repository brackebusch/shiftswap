const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const Workplace = require('../db/models/workplace');

router.post('/addworkplace', (req, res) => {
  console.log(req.body);
  const { name, formatted_address, place_id, user } = req.body;
  let workplace;
  workplace = new Workplace({
    'name': name,
    'formatted_address': formatted_address,
    'place_id': place_id,
    'employees': [user],
    'shifts': []
  });
  console.log(workplace);
  workplace.save((err, savedWorkplace) => {
    if (err) return res.json(err);
    console.log(`saved ${savedWorkplace}`);
    // user.workplace.type = savedWorkplace.data._id;
    return res.json(savedWorkplace);
  });
  console.log(user);
  // Workplace.findOne({ 'place_id': place_id }, (err, workplaceMatch) => {
  //   if (workplaceMatch) {
  //     workplace = workplaceMatch;
  //     console.log('matched');
  //   } else {
  //   }
  // });
  // console.log(workplace);
});

module.exports = router;
