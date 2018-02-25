const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const Workplace = require('../db/models/workplace');

// ####### THIS IS WHERE USER CONNECTS TO PROFILE #####

router.patch('/addworkplace', (req, res) => {
  const { user } = req.body;
  User.findOneAndUpdate({'_id': user._id},
    {$set: {workplace: user.workplace}}, {new: true}, (err, doc) => {
      if (err) console.log(err);
      console.log(doc);
    }
  );
});

module.exports = router;
