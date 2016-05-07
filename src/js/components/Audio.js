import {Entity} from 'aframe-react';
import React from 'react';

class Audio extends React.Component{
  static frequencyData;
  static analyzer;

  static defaultProps = {
    frequencySize: 32,
    audioSrc : {default: ''},
    heights: ''
  };
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.setupAudio();
  }
  setupAudio() {
    var audioPlease =  document.createElement('audio');//new Audio();
/*    audioPlease.src = this.props.audioSrc;
    audioPlease.loop = true;
    audioPlease.autoplay = true;*/
    audioPlease.setAttribute('src',this.props.audioSrc);
    audioPlease.setAttribute('loop',true);
    audioPlease.setAttribute('autoplay',true);

    // TODO: pass this in as prop
    var element = document.createElement('div');
    element.setAttribute('class','audio-player');
    element.appendChild(audioPlease);
    document.getElementsByClassName('audio')[0].appendChild(element);
    var ctx = new AudioContext();

    var src = ctx.createMediaElementSource(audioPlease);
    var analyzer = ctx.createAnalyser();
    src.connect(analyzer);
    analyzer.connect(ctx.destination);

    analyzer.fftSize = this.props.frequencySize;
    var frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(frequencyData);

    Audio.analyzer = analyzer;
    Audio.frequencyData = frequencyData;
    var that = this;
    setInterval(function(){
      that.updateAudio();
    },100);
  }

  updateAudio(){
    // Get the new frequency data
    Audio.analyzer.getByteFrequencyData(Audio.frequencyData);
    var y = [];

    // TODO: maybe change this to just be based off frequencySize
    for (var i in Audio.frequencyData){
      y[i] = Audio.frequencyData[i];
    }
    // TODO/FIXME: This is so dirty
    this._reactInternalInstance._currentElement._owner._instance.setState({heights:y});
  }

  render(){
    return(
      <Entity class="audio">
      </Entity>
    );
  }
};

export default Audio;