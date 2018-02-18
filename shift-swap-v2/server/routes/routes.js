//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../../models/User');
router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
 var user = new User();
 user.name = req.body.name;
 user.email = req.body.email;
 user.phone_number = req.body.phone_number;
 user.password_digest = req.body.password_digest,
 user.session_token = req.body.session_token;

user.save(function(err) {
      if (err)
        res.send(err);
      res.send('User successfully added!');
  });
})
router.route('/update')
.post(function(req, res) {
 const doc = {
     name: req.body.name,
     email: req.body.email,
     phone_number: req.body.phone_number,
     password_digest: req.body.password_digest,
     session_token: req.body.session_token     
 };
 console.log(doc);
  User.update({_id: req.body._id}, doc, function(err, result) {
      if (err)
        res.send(err);
      res.send('User successfully updated!');
  });
});
router.get('/delete', function(req, res){
 var id = req.query.id;
 User.find({_id: id}).remove().exec(function(err, user) {
  if(err)
   res.send(err)
  res.send('User successfully deleted!');
 })
});
router.get('/getAll',function(req, res) {
 var nameRec = req.query.name;
 var emailRec = req.query.email;
 if(nameRec && nameRec != 'All'){
  User.find({$and: [ {name: nameRec}, {email: emailRec}]}, function(err, users) {
   if (err)
    res.send(err);
   res.json(users);
  });
 } else {
  User.find({email: emailRec}, function(err, users) {
   if (err)
    res.send(err);
   res.json(users);
  });
 }
});
module.exports = router;