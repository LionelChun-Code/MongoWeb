var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile page. */
router.get('/profile', function(req, res, next) {
  const user = { email: 'user@example.com', name: 'John Doe' };
  res.render('profile', { user: user });
});

/* GET user settings page. */
router.get('/settings', function(req, res, next) {
  res.render('settings', { title: 'Settings' });
});

/* POST update profile. */
router.post('/profile', function(req, res, next) {
  // Handle profile update logic here
  res.redirect('/users/profile');
});

/* POST update settings. */
router.post('/settings', function(req, res, next) {
  // Handle settings update logic here
  res.redirect('/users/settings');
});

module.exports = router;
