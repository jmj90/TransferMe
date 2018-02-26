import React, { Component } from 'react'
import onApiLoad from '../../server/gdriveutils'
import loadDropbox from '../../server/dropboxutils'
import { Button } from 'semantic-ui-react'


export class TransferView extends Component {
  constructor() {
    super();
    this.runPickerApi = this.runPickerApi.bind(this)
    // this.handleClick = this.handleClick.bind(this)
  }

// ====== load dropbox functions when mounted ======
  componentDidMount() {
    loadDropbox()
  }

// ====== runs google api functions after the api script has been loaded ======
  runPickerApi() {
    onApiLoad()
  }

  // ====== attempting to generate popup for dropbox authorization ======

  // handleClick(link) {
  //   console.log(link)
  //   window.open(link,'mypopuptitle','width=600,height=400,location=false')
  // }

  render () {
    return (
      <div>
        <div id='google-picker'>
          <h4>Google Drive File Selector</h4>
          <img id="gdrive-icon" src="assets/images/gdrivelogo.png"/>
          <h5>click below to allow access to your Google Drive directories</h5>
          <button
            onClick={this.runPickerApi()}
            type="button"
            id="auth"> Authorize </button>
          <div id="result"></div>
          <button
            type="button"
            id="pickfile"
            hidden
            disabled>Select a Different File</button>
          <div id="copy-to-dropbox-btn"></div>
        </div>
        <div id="dropbox-picker">
          <h4>Dropbox File Selector</h4>
          <img id="db-icon" src="assets/images/dropboxlogo.svg" />
          <div id="pre-auth-section" hidden>
            <h5 className="authed">click below to allow access to your Dropbox directories</h5>
            <a
              href=""
              id="authlink"
              hidden
              className="button">
              <button>Authorize</button></a>
          </div>
          {/*<button id="authTest" link="" onClick={() => this.handleClick(document.getElementById('authlink').href)}>open popup</button>*/}
          <div id="authed-section">
            <button className="authed">Copy To Google Drive</button>
            <ul id="files" />
          </div>
        </div>
    </div>
    )
  }
}

module.exports = {TransferView}
