// import Picker from '@progresso/react-giphy-picker-https'
import Picker from 'react-giphy-picker'
import ReactDOM from 'react-dom'
import React, { Component, PropTypes } from 'react'
 
import {
  pickerStyle
} from "./style";

class CometChatGiphyPicker extends Component {
//   log (gif) {
//     console.log(gif)
//   }


 
  render () {
    console.log('selected gif = ', this.props.gifSelected);
    return (
      <Picker onSelected={this.props.gifSelected} />
    )
  }
}

export { CometChatGiphyPicker };