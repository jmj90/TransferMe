// 'use strict';
//
// // Standalone example to demonstrate codeflow.
// // Start the server, hit localhost:3000 on the browser, and click through.
// // On the server logs, you should have the auth code, as well as the token
// // from exchanging it. This exchange is invisible to the app user
//
// require('isomorphic-fetch');
//
// const app = require('express')();
// const hostname = 'localhost';
// const port = 8080;
// //const https = require('https');
//
//
// const config = {
//   clientId: ['7pqywseuvbmdm6a'],
//   clientSecret: ['w2qki0k3a25y0pf']
// };
//
// const Dropbox = require('dropbox').Dropbox;
// var dbx = new Dropbox(config);
//
// const redirectUri = `http://${hostname}:${port}/auth`;
// const authUrl = dbx.getAuthenticationUrl(redirectUri, null, 'code');
//
// app.get('/', (req, res) => {
//   res.writeHead(302, { 'Location': authUrl });
//   res.end();
// });
//
//
// app.get('/auth', (req, res) => {
//   let code = req.query.code;
//   console.log(code);
//   var options = Object.assign({
//     code,
//     redirectUri
//   }, config);
//
//
//   dbx.getAccessTokenFromCode(redirectUri, code)
//     .then(function(token) {
//         console.log(token);
//     })
//     .catch(function(error) {
//         console.log(error);
//     });
// });
//
// app.listen(port);
//


// const Dropbox = require('dropbox').Dropbox;
// const DropboxTeam = require('dropbox').DropboxTeam;
//
// import axios from 'axios'; // or another library of choice.
//
// var dbx = new Dropbox({ accessToken: '9Xh1_fTf1rwAAAAAAACBf5cqbdheRgKYnodMUyYWCdDhG04HcmSlbDWX7x7N2tCr' });
//
// dbx.usersGetCurrentAccount()
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.error(error);
//   });

// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
