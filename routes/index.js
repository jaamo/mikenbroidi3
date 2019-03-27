var express = require('express');
var router = express.Router();
const {Client} = require('pg');

router.get('/', function(req, res) {
  const accessToken = req.app.locals.accessToken;

  // PG client.
  const client = new Client();
  client.connect();
  client.query('SELECT * FROM projects', [], (err, res) => {
    console.log(err ? err.stack : res.rows[0].id); // Hello World!
    client.end();
  });

  res.render('index', {
    title: 'Express',
    accessToken: accessToken,
  });
});

module.exports = router;
