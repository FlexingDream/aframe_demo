import {Entity,Animation} from 'aframe-react';
import React from 'react';
import _ from 'underscore';
import $ from 'jquery';
class Audio extends React.Component{
  static defaultProps = {
    fastFourierTransform: 1024,
    audioSrc : {default: ''},
    heights: '',
    refreshRate: 50,
    frequencySize: {default: 512},
    shouldPlay: {default: false},
    shouldUpdateFrequencies: {default: false}
  };
  constructor(props){
    super(props);
    this.state = {
      frequencyData: [],
      analyzer: '',
      node: '',
      audioElement: []
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.shouldPlay == false){
      var node = this.state.node;
      node.stop(0);
    }
  }

  componentDidMount(){
    // this.setupAudioElement();
    this.setupAudioBuffer();

    if (this.props.shouldUpdateFrequencies){
      var that = this;
      setInterval(function(){
        that.updateAudio();
      },that.props.refreshRate);
    }
  }
  setupAudioBuffer(){
    var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
    var audioCtx = new AudioContext();
    var node = audioCtx.createBufferSource();
      // createBuffer(channels, samples, sampleRate)
    var buffer = audioCtx.createBuffer(1, 4096, audioCtx.sampleRate);

    var data = buffer.getChannelData(0);
    var that = this;

    // 
    var request = new XMLHttpRequest();

    request.open('GET', this.props.audioSrc, true);

    request.responseType = 'arraybuffer';
    request.onload = function() {
    var audioData = request.response;

    audioCtx.decodeAudioData(audioData, function(buffer) {
        node.buffer = buffer;
        node.loop = false;
        node.connect(audioCtx.destination);
        // node.start(0);
        var element = document.createElement('div');
        element.setAttribute('class','audio-player');
        $(element).data('audio-node',node);
        document.getElementsByClassName('audio')[0].appendChild(element);

        if (that.props.shouldUpdateFrequencies){
          var analyzer = audioCtx.createAnalyser();

          node.connect(analyzer);
          analyzer.connect(audioCtx.destination);


          analyzer.fftSize = that.props.fastFourierTransform;

          // FrequencyBinCount is unsigned long value HALF That of the FFT size
          // that.state.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
          that.state.frequencyData = new Uint8Array(that.props.frequencySize);
          analyzer.getByteFrequencyData(that.state.frequencyData);
          that.state.analyzer = analyzer;
        }
        var animationLoadIn = document.createElement('a-animation');
        animationLoadIn.setAttribute('attribute','visible');
        animationLoadIn.setAttribute('to',true);
        if (document.getElementsByTagName('a-image')>0){
          document.getElementsByTagName('a-image')[0].appendChild(animationLoadIn);
          document.getElementsByTagName('a-image')[0].setAttribute('visible',true);
        }
        if (document.getElementById('curtain')){
          var left = document.getElementById('curtain-left');
          var right = document.getElementById('curtain-right');
          left.emit('start');
          right.emit('start');
          left.children[0].addEventListener('animationend',function(){
            $(left).remove();
            $(right).remove();
            node.start(0);
          });
        }
        else if (document.getElementById('scene')){
          document.getElementById('scene').emit('song_loaded');
          node.start(0);
        }
        else{
          node.start(0);
        }
        that.setState({node: node});
      },

      function(e){"Error with decoding audio data" + e.err});

    } 

    request.send();

  //
  }

  setupAudioVisualizers(audioElement){
    var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
    var audioCtx = new AudioContext();
    
    var src = audioCtx.createMediaElementSource(audioElement);

    var analyzer = audioCtx.createAnalyser();

    src.connect(analyzer);
    analyzer.connect(audioCtx.destination);


    analyzer.fftSize = this.props.fastFourierTransform;

    // FrequencyBinCount is unsigned long value HALF That of the FFT size
    this.state.frequencyData = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(this.state.frequencyData);
    this.state.analyzer = analyzer;
  }

  setupAudioElement() {
    // NOTE: if you want an audio element to work on mobile, need to have a touch event first

    var audioElement =  document.createElement('audio');
    audioElement.setAttribute('src',this.props.audioSrc);
    audioElement.setAttribute('loop',false);
    audioElement.setAttribute('crossOrigin',"anonymous");

    var element = document.createElement('div');
    element.setAttribute('class','audio-player');
    element.appendChild(audioElement);
    document.getElementsByClassName('audio')[0].appendChild(element);
    this.setState({audioElement: audioElement});
    var that = this;
    setTimeout(function(){
      that.startAudioElement();
    },4000);
    // this.setupAudioVisualizers(audioElement);
  }

  startAudioElement(){
    if (document.getElementById('scene')){
      document.getElementById('scene').emit('song_loaded');
      document.querySelector('audio').play();
    }
  }

  updateAudio(){
    // Get the new frequency data
    var frequencyData = this.state.frequencyData;
    if (frequencyData.length == 0) return;
    this.state.analyzer.getByteFrequencyData(frequencyData);
    var y = [];

    for (var i =0;i<this.props.frequencySize;i++){
      y[i] = frequencyData[i];
    }
    // TODO/FIXME: This is so dirty
    // if (!_.isEqual(this._reactInternalInstance._currentElement._owner._instance.state.heights,y))
      // this._reactInternalInstance._currentElement._owner._instance.setState({heights:y});

      this.props.shouldUpdateFrequencies(y);
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