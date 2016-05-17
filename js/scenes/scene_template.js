import 'aframe';
import 'aframe-layout-component';
import React from 'react';
import ReactDOM from 'react-dom';

import Perf from 'react-addons-perf';
// import Waveform from '../components/Waveform';
import 'babel-polyfill';
import $ from 'jquery';


class SceneTemplate extends React.Component{
  static defaultProps = {
    frequencySize : 80,
    refreshRate: 50
  };
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      song: ''
    }
  }
}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;

export default SceneTemplate;