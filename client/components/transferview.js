import React, { Component } from 'react'
import onApiLoad from '../../server/gdriveutils'


export class TransferView extends Component {
  constructor() {
    super();
    this.runPickerApi = this.runPickerApi.bind(this)
  }

  runPickerApi() {
    return onApiLoad()
  }

  render () {
    return (
      <div id='google-picker'>
        <button onClick={this.runPickerApi} type="button" id="auth">Authenticate</button>
        <button type="button" id="pickfile" hidden disabled>Select A File</button>
        <div id="result"></div>
      </div>
    )
  }
}

module.exports = {TransferView}
