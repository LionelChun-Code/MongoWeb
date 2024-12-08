var express = require('express');
var router = express.Router();

/* GET dashboard page. */
router.get('/', function(req, res, next) {
  const user = { email: 'user@example.com' };
  res.render('dashboard', { user: user });
});

module.exports = router;
