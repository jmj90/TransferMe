import React, { Component } from 'react'
import onApiLoad from '../../server/gdriveutils'
import { Button } from 'semantic-ui-react'


export class TransferView extends Component {
  constructor() {
    super();
    this.runPickerApi = this.runPickerApi.bind(this)
  }

  runPickerApi() {
    onApiLoad()
  }

  render () {
    return (
      <div>
      <div id='google-picker'>
        <img id="gdrive-icon" src="assets/images/gdrivelogo.png"/>
        <h4>Google Drive File Selector</h4>
        <button onClick={this.runPickerApi()} type="button" id="auth">Login</button>
        <div id="result"></div>
        <button type="button" id="pickfile" hidden disabled>Select a Different File</button>
        <div id="copy-to-dropbox-btn"></div>
      </div>
    </div>
    )
  }
}

module.exports = {TransferView}
