var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/', function(req, res) {
  var accessToken = req.app.locals.accessToken;

  axios
    .get(
      'https://online.planmill.com/evermade/api/1.5/projects?rowcount=1000',
      {
        headers: {Authorization: 'Bearer ' + accessToken},
      },
    )
    .then(function(response) {
      //console.log(response);

      // Get only active projects.
      var activeProjects = response.data.filter(function(project) {
        return project.status == 3;
      });

      console.log(activeProjects);

      res.render('projects', {projects: activeProjects});
    })
    .catch(function(error) {
      console.log(error);
      res.send('Vituiks: ' + JSON.stringify(error));
    })
    .then(function() {});
});

module.exports = router;
