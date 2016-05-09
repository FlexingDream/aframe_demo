import {Entity} from 'aframe-react';
import React from 'react';

class Audio extends React.Component{
  static defaultProps = {
    fastFourierTransform: 2048,
    audioSrc : {default: ''},
    heights: '',
    refreshRate: 50,
    frequencySize: {default: 1024}
  };
  constructor(props){
    super(props);
    this.state = {
      frequencyData: [],
      analyzer: ''
    };
  }
  componentDidMount(){
    this.setupAudioElement();

    var that = this;
    setInterval(function(){
      that.updateAudio();
    },that.props.refreshRate);
  }
  setupAudioVisualizers(audioElement){
    var ctx = new AudioContext();

    var src = ctx.createMediaElementSource(audioElement);
    var analyzer = ctx.createAnalyser();

    src.connect(analyzer);
    analyzer.connect(ctx.destination);


    analyzer.fftSize = this.props.fastFourierTransform;

    // FrequencyBinCount is unsigned long value HALF That of the FFT size
    this.state.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(this.state.frequencyData);
    this.state.analyzer = analyzer;
  }

  setupAudioElement() {
    var audioElement =  document.createElement('audio');
    audioElement.setAttribute('src',this.props.audioSrc);
    audioElement.setAttribute('loop',true);
    audioElement.setAttribute('crossOrigin',"anonymous");
    // audioElement.setAttribute('autoplay',false);
    // audioElement.setAttribute('controls',true);

    var element = document.createElement('div');
    element.setAttribute('class','audio-player');
    element.appendChild(audioElement);
    document.getElementsByClassName('audio')[0].appendChild(element);
    this.setupAudioVisualizers(audioElement);
  }

  updateAudio(){
    // Get the new frequency data
    var frequencyData = this.state.frequencyData;
    this.state.analyzer.getByteFrequencyData(frequencyData);
    var y = [];

    // TODO: maybe change this to just be based off frequencySize
    for (var i =0;i<this.props.frequencySize;i++){
      y[i] = frequencyData[i];
    }
    // TODO/FIXME: This is so dirty
    this._reactInternalInstance._currentElement._owner._instance.setState({heights:y});
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render(){
    return(
      <Entity class="audio">
      </Entity>
    );
  }
};

export default Audio;