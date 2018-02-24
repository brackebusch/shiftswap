const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const Workplace = require('../db/models/workplace');

// ####### THIS IS WHERE USER CONNECTS TO PROFILE #####

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
    user.workplace = savedWorkplace._id;

    // ##### THIS IS WHERE I TRY TO UPDATE USER ######
    User.update({_id: user._id},
      {workplace: savedWorkplace._id}, error => console.log(error));
    user.save();
    console.log(user);
    return res.json(savedWorkplace);
  });
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
