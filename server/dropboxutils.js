import Dropbox from 'dropbox'

// ====== loader for all dropbox functions  ====== \\
function loadDropbox(){

  // hardcoded while working
  // var CLIENT_ID = process.env.DROPBOX_CLIENT_ID
   var CLIENT_ID = '7pqywseuvbmdm6a';

  // Parses the url and gets the access token if it is in the urls hash
  function getAccessTokenFromUrl() {
   return utils.parseQueryString(window.location.hash).access_token;
  }

  // If the user was just redirected from authenticating, the urls hash will
  // contain the access token.
  function isAuthenticated() {
    return !!getAccessTokenFromUrl();
  }

  // Render a list of items to #files
  function renderItems(items) {
    var filesContainer = document.getElementById('files');
    items.forEach(function(item) {
      var li = document.createElement('li');
      li.innerHTML = item.name
      console.log('Dropbox "Item" Object', item)
      filesContainer.appendChild(li);
    });
  }

  // keeps both the authenticate and non-authenticated setions
  // in the DOM and uses this function to show/hide the correct section.
  function showPageSection(elementId) {
    let section = document.getElementById(elementId)
    // section.hidden = true
  }

  if (isAuthenticated()) {
    // showPageSection('authed-section');
    document.getElementsByClassName('authed').hidden = false

    // Create an instance of Dropbox with the access token and use it to
    // fetch and render the files in the users root directory.
    document.getElementById('authlink').hidden = true
    var dbx = new Dropbox.Dropbox({ accessToken: getAccessTokenFromUrl() });
    dbx.filesListFolder({path: ''})
      .then(function(response) {
        renderItems(response.entries);
      })
      .catch(function(error) {
        console.error(error);
      });
  } else {
    showPageSection('pre-auth-section');
    document.getElementsByClassName('authed').hidden = true
    document.getElementById('authlink').hidden = false

    // Set the login anchors href using dbx.getAuthenticationUrl()
    var dbx = new Dropbox.Dropbox({ clientId: CLIENT_ID });
    var authUrl = dbx.getAuthenticationUrl('http://localhost:8080/authDROPBOX');
    document.getElementById('authlink').href = authUrl;
    // document.getElementById('authTest').href = authUrl;
  }
}


export default loadDropbox
