var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var uri = req.app.locals.planmillAuth.code.getUri();
  res.redirect(uri);
});

router.get('/callback', function(req, res) {
  req.app.locals.planmillAuth.code.getToken(req.originalUrl).then(
    function(user) {
      console.log(user);
      console.log('accessToken: ' + user.accessToken);
      req.app.locals.accessToken = user.accessToken;
      return res.redirect('/');
      //return res.send(user.accessToken);
    },
    function(e) {
      console.log(e);
      return res.redirect('/');
    },
  );
});

module.exports = router;
