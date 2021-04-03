const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/signin');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  