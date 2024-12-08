function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.status(401).json({ error: 'You must log in to view this page.' });
    }
  }
  
  function ensureNotAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
      return res.redirect('/dashboard'); // 已登入用戶重定向到 dashboard
    } else {
      return next();
    }
  }
  
  module.exports = { ensureAuthenticated, ensureNotAuthenticated };
  