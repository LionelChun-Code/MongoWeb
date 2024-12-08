var express = require('express');
var router = express.Router();
const { hashPassword, comparePassword } = require('./utils/bcryptHelper');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET signin page. */
router.get('/signin', function(req, res, next) {
  res.render('signin', { title: 'Sign In' });
});

/* POST signin form. */
router.post('/signin', function(req, res, next) {
  // Handle signin logic here
  const user = { email: req.body.email };
  res.render('dashboard', { user: user });
});

/* GET signout page. */
router.get('/signout', function(req, res, next) {
  // Handle signout logic here
  res.redirect('/');
});

/* GET signup page. */
router.get('/signup', function(req, res, next) {

  res.render('signup', { title: 'Sign Up' });
});

/* POST signup form. */
router.post('/signup', function(req, res, next) {
  // Handle signup logic here
  const user = { email: req.body.email };
  res.render('dashboard', { user: user });
});

module.exports = router;
