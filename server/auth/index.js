const router = require('express').Router()
const User = require('../db/models/user')
const hostname = 'localhost';
const port = 8080;

require('isomorphic-fetch');

module.exports = router


const config = {
  clientId: ['7pqywseuvbmdm6a'],
  clientSecret: ['w2qki0k3a25y0pf']
};

const Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox(config);

const redirectUri = `http://${hostname}:${port}/auth/db`;
const authUrl = dbx.getAuthenticationUrl(redirectUri, null, 'code');

router.get('/', (req, res) => {
  res.writeHead(302, { 'Location': authUrl });
  res.end();
});


router.get('/db', (req, res) => {
  let code = req.query.code;
  console.log('this is the code: ', code);
  var options = Object.assign({
    code,
    redirectUri
  }, config);

});
