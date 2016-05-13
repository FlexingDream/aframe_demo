import 'aframe';
import 'aframe-layout-component';
import '../aframe_components/Collider';
import '../aframe_components/RayCaster';
import '../aframe_components/entity-generator';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import Floor from '../components/Floor';
import RainingObjects from '../components/RainingObjects';
import Audio from '../components/Audio';
import Waveform from '../components/Waveform';
import 'babel-polyfill';
import $ from 'jquery';
import _ from 'underscore';

class BoilerplateScene extends React.Component {
  static defaultProps = {
    frequencySize : 80,
    refreshRate: 50
  };
  constructor(props) {
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      song: 'https://cdn.rawgit.com/FlexingDream/aframe_demo/master/src/audio/alesso.mp3'
    }
  }

  shouldComponentUpdate(newProps,newState){
    if (_.isEqual(newState.heights, this.state.heights) )
      return false;
    else
     return true;
  }

  getMixins(){
    return(
      <Entity>
        <a-mixin id="snow" geometry="primitive: box; depth: 0.02;height: 0.04; width: 0.04" material="color: #DDD; opacity: 0.4; shader: flat"></a-mixin>
        <a-mixin id="pulse" geometry="primitive: circle; radius: 1;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="waveform" geometry="primitive: circle; radius: 0.5;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0" look-at='[camera]'></a-mixin>

        <a-mixin id="snake" geometry="primitive: box; height: 0.2; depth: 5; width: 0.2;" material="color: #72CCBC; shader: flat;" rotation="0 0 90"></a-mixin>
        <a-mixin id="planet" geometry="primitive: sphere; radius: 50;" material="color: white; "></a-mixin>
      </Entity>
    );
  }
  shouldUpdateFrequencies(heights){
    if (!_.isEqual(heights,this.state.heights))
      this.setState({heights: heights});
  }

  render () {
    var mixins = this.getMixins();
    return (
      <Scene stats>
        <a-assets>
          <a-mixin id="spaceship" src="../3d_models/model.dae" />
          <a-mixin id="saturn" src="../3d_models/saturn.dae" />
          <img id="loading" src="../img/loading.jpg"/>
          {mixins}
        </a-assets>
        <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
        <Camera position={[0,10,0]}>
          <Cursor />
        </Camera>
        <Sky color='#1D2327'/>
        <Waveform heights={this.state.heights}/>
        <Pulse heights={this.state.heights}/>
        <a-image src="#loading" position="0 10 -5" visible='false'></a-image>
        <SolarSystem/>
        <RainingObjects animationDirection='alternate' mixin='snow' spread="50" numElements="500"/>
      </Scene>
    );
//        <Sky color='#1D2327'/>
    //           <RainingObjects animationDirection='alternate' mixin='snow' spread="25" numElements="250"/>
          // <Pulse heights={this.state.heights}/>
          // <Waveform heights={this.state.heights}/>
  }
}

class SolarSystem extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    var planets = [];
    return(
      <Entity>
        <Rocket/>
        <Entity collada-model="#saturn" position="150 0 0" rotation="90 90 90">
          <Animation attribute="rotation" to="360 360 360" dur="120000" repeat="indefinite" ease="linear" />
        </Entity>
        <Entity entity-generator-planets="numElements: 10; mixin: planet; spread: 500;minExclusion: -100; maxExclusion: 100;"/>
      </Entity>
    );
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
}

class Rocket extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Entity>
        <Entity collada-model="#spaceship" look-at='#point' position="100 0 0" rotation="90 90 90"/>
          <Animation attribute="rotation" to="0 -360 0" dur="60000"  repeat="indefinite" ease="linear"/>
      </Entity>);
  }

  shouldComponentUpdate(nextState,nextProps){
    return false;
  }

}

class SnakeLines extends React.Component{
  static defaultProps = {
    numBlocks: 12,
    spread: 30
  };

  constructor(props){
    super(props);
  }

  getSpread (spread) {
    return Math.random() * spread - spread / 2;
  }

  render(){
    var snakes = [];
    for (var i =0;i<this.props.numBlocks;i++){
      snakes.push(
      <Entity mixin="snake" position={[this.getSpread(this.props.spread),this.getSpread(this.props.spread),this.getSpread(this.props.spread)]}/>
      );
    }
    return(
      <Entity look-at="[camera]">{snakes}</Entity>
    );
  }
}

class Pulse extends React.Component{
  static defaultProps = {
    numBlocks: 4
  };

  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return !_.isEqual(nextProps.heights,this.props.heights);
  }
  render(){
    var elements = [];
    var template = React.createElement(Entity, {
      mixin: "pulse",
    },null);
    for (var i = 0;i < this.props.numBlocks; i++){
      var height = this.props.heights[i] == 0 ? 1 : this.props.heights[i]/50;
      var newElement = React.cloneElement(template, {position: [0,0,i], geometry: {radius: height}, key: i},null);
      elements.push(newElement);
    }
    return(<Entity cursor-listener class="lookable" look-at='[camera]'>{elements}</Entity>);
  }

}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));

