let pickerApiLoaded = false;
let oauthToken;

// cant get these to access the secrets file, momentarily hard coded for time
const developerKey = process.env.GOOGLE_DEVELOPER_KEY;
const developerKeyHardCoded = 'AIzaSyBIAgZTf4XcKdZ9nIXoHVMjfEugbGlkPQs';
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientIdHardCoded = '66281004346-2nmha2qpgnb0jc51c19v2qbsc3jf2mf8.apps.googleusercontent.com';

// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
  gapi.load('auth2', onAuthApiLoad);
  gapi.load('picker', onPickerApiLoad);
}

function onAuthApiLoad() {
  let scope = "https://www.googleapis.com/auth/drive"
  let authBtn = document.getElementById('auth')
  authBtn.disabled = false;
  authBtn.addEventListener('click',() => {
    gapi.auth2.authorize({
      client_id: clientIdHardCoded,
      scope: scope
    }, handleAuthResult),
    authBtn.hidden = true;
  });
}

function onPickerApiLoad() {
  pickerApiLoaded = true;
  createPicker();
}

function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker();
  }
}

// Create and render a Picker object for picking user files or folers.
function createPicker() {
  if (pickerApiLoaded && oauthToken) {

    //generates a 'select a file' button
    let pickfileBtn = document.getElementById('pickfile');
    pickfileBtn.addEventListener('click', function() {
      createPicker()
    });
    pickfileBtn.disabled = false;
    pickfileBtn.hidden = false;

    //allows for folders to be selected
    let docsView = new google.picker.DocsView()
      .setIncludeFolders(true)
        .setSelectFolderEnabled(true)
          .setParent('root');

    // renders google uploader
    let docsUpload = new google.picker.DocsUploadView()

    // renders the Picker Object with all parameters we set
    let picker = new google.picker.PickerBuilder()
      .addView(docsView)
        .addView(docsUpload)
          .setOAuthToken(oauthToken)
            .setDeveloperKey(developerKeyHardCoded)
              .setCallback(pickerCallback)
                .build();
                picker.setVisible(true);
  }
}

  // A simple callback implementation.
function pickerCallback(data) {
  let url = 'no current selection';
  let name;
  let filetype;
  let typeicon
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    let doc = data[google.picker.Response.DOCUMENTS][0];
    console.log('Google Drive Object', doc)
    name = doc.name
    url = doc[google.picker.Document.URL];
    filetype = doc.type
    typeicon = `<img src=${doc.iconUrl}/>`
  }
  let message = 'You have selected: ' + name + ' [file type: ' + filetype + ' ' + typeicon + ']';
  document.getElementById('result').innerHTML = message;
  document.getElementById('copy-to-dropbox-btn').innerHTML = '<button>Copy To Dropbox</button>'
}

function downloadFile(file, callback) {
    if (file.downloadUrl) {
      let accessToken = gapi.auth.getToken().access_token;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', file.downloadUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.onload = function() {
        callback(xhr.responseText);
      };
      xhr.onerror = function() {
        callback(null);
      };
      xhr.send();
    } else {
      callback(null);
    }
  }

export default onApiLoad
