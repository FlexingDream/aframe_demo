import 'aframe';
import 'aframe-layout-component';
import '../aframe_components/Collider';
import '../aframe_components/raycaster-helper';
import '../aframe_components/entity-generator';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import RainingObjects from '../components/RainingObjects';
import Audio from '../components/Audio';
import Laser from '../components/Laser';
// import Waveform from '../components/Waveform';
import 'babel-polyfill';
import $ from 'jquery';
import _ from 'underscore';

var ASSET_LOCATION = "";

class Scene1 extends React.Component{
  static defaultProps = {
    frequencySize : 80,
    refreshRate: 50
  };
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      song: 'https://cdn.rawgit.com/FlexingDream/aframe_demo/master/src/audio/alesso.mp3'
    }
  }

  shouldComponentUpdate(newsProps,newState){
    if (_.isEqual(newState.heights, this.state.heights) )
      return false;
    else
     return true;
  }


  getMixins(){
    return(
      <Entity>
        <a-mixin id="snow" geometry="primitive: box; depth: 0.02;height: 0.04; width: 0.04" material="color: #DDD; opacity: 0.4; shader: flat"></a-mixin>
        <a-mixin id="pulse" geometry="primitive: torus;" material="color: white; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="circlePulse" geometry="primitive: sphere;" material="color: white; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="waveform" geometry="primitive: circle;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0"></a-mixin>
        <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
      </Entity>
    );
  }

  shouldUpdateFrequencies(heights){
    if (!_.isEqual(heights,this.state.heights))
      this.setState({heights: heights});
  }

  render(){
    var mixins = this.getMixins();
    return (
      <Scene stats>
        <a-assets>
          <img id="loading" src={ASSET_LOCATION +"img/loading.jpg" }/>
          {mixins}
        </a-assets>
        <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
        <Camera position={[0,5,0]}>
          <Cursor />
        </Camera>
        <Sky color='#1D2327'/>
        <a-image src="#loading" position="0 5 -5" visible='false'></a-image>
        <RainingObjects animationDirection='alternate' mixin='snow' spread="50" numElements="500"/>
        <Pulse heights={this.state.heights}/>
        <CirclePulse heights={this.state.heights}/>
        <Lasers/>
      </Scene>
    );
  }
}

class CirclePulse extends React.Component{
  static defaultProps = {
    numBlocks: 1
  };

  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return !_.isEqual(nextProps.heights,this.props.heights);
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    var elements = [];
    var template = React.createElement(Entity, {
      mixin: "circlePulse",
    },null);
    for (var i = 0;i < this.props.numBlocks; i++){
      var height = this.props.heights[i] == 0 ? 1 : this.props.heights[i]/50;
      var newElement = React.cloneElement(template, {
        // position: [0,0,], 
        key: i, 
        geometry: {radius: height},
        material: {color: this.getRandomColor()}},null);
      // var newElement = React.cloneElement(template, {position: [0,0,i], geometry: {radius: height}, key: i},null);
      elements.push(newElement);
    }
    return(<Entity cursor-listener class="lookable">
      <Animation attribute="rotation" to="360 360 360" dur="60000" repeat="indefinite" direction="alternate" easing="ease-sine"/>
      {elements}
      </Entity>);
  }
}

class Pulse extends React.Component {
  static defaultProps = {
    numBlocks: 4
  };

  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return !_.isEqual(nextProps.heights,this.props.heights);
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    var elements = [];
    var template = React.createElement(Entity, {
      mixin: "pulse",
    },null);
    var rotation = "";
    for (var i = 0;i < this.props.numBlocks; i++){
      var height = this.props.heights[i] == 0 ? 1 : this.props.heights[i]/50;
      switch(i%4){
        case(0): {
          rotation="0 0 0";
          break;
        }
        case(1):{
          rotation = "90 0 0";
          break;
        }
        case (2):{
          rotation = "0 90 0";
          break;
        }
        case (3):{
          rotation = "0 0 90";
          break;
        }
      }
      var newElement = React.cloneElement(template, {
        // position: [0,0,], 
        rotation: rotation,
        key: i, 
        geometry: {radius: height},
        material: {color: this.getRandomColor()}},null);
      // var newElement = React.cloneElement(template, {position: [0,0,i], geometry: {radius: height}, key: i},null);
      elements.push(newElement);
    }
    return(<Entity cursor-listener class="lookable">
      <Animation attribute="rotation" to="360 360 360" dur="60000" repeat="indefinite" direction="alternate" easing="linear"/>
      {elements}
      </Entity>);
  }
}

class Waveform extends React.Component{
  static defaultProps = {
    numBlocks: 16,
    radius: 16
  };
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return !_.isEqual(nextProps.heights,this.props.heights);
  }
  render(){
    var elements = [];
    var template = React.createElement(Entity, {
      mixin: "waveform",
    },null);
    var templateAnim = React.createElement(Animation,{
      attribute: 'rotation',
      to: "270 270 270",
      dur: 30000,
      repeat: 'indefinite',
      easing: 'linear',
      direction: 'alternate'
    },null);
    var radius = this.props.radius;
    for (var i = 0;i < this.props.numBlocks; i++){
      // var y = this.props.heights[i]/32;
      var x,z,rad;
      rad = i * (2 * Math.PI)/ this.props.numBlocks;
      x = radius * Math.cos(rad);
      var y = 0;
      var height = this.props.heights[i] == 0 ? 0.5 : this.props.heights[i]/128;
      z = radius * Math.sin(rad);
      var newElement = React.cloneElement(template, {
        position: [x,y,z],
        key: i, 
        material:{color: this.getRandomColor()},
        rotation: [45,45,45],
        geometry:{height: height, width: height}
      },React.cloneElement(templateAnim,{},null));
      elements.push(newElement);
    }
    return(
      <Entity>
        <Animation attribute="rotation" to="0 360 0" dur="50000" repeat="indefinite" direction="alternate"/>
        {elements}
      </Entity>
    );
  }
}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<Scene1/>, document.querySelector('.scene-container'));