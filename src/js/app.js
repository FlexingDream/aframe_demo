import 'aframe';
import 'babel-polyfill';
import {Animation, Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import 'aframe-layout-component';
import Camera from './components/Camera';
import Cursor from './components/Cursor';
import Sky from './components/Sky';
import Floor from './components/Floor';
import RainingObjects from './components/RainingObjects';
import Audio from './components/Audio';
import './aframe_components/Collider';
import './aframe_components/RayCaster';
import './aframe_components/entity-generator';
import $ from 'jquery';
import PureRenderMixin from 'react-addons-pure-render-mixin';
// import Perf from 'react-addons-perf';

class BoilerplateScene extends React.Component {
  static frequencySize = 256;

  constructor(props) {
    super(props);
    var heights = Array.apply(null,Array(BoilerplateScene.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      song: 'https://res.cloudinary.com/gavinching/video/upload/v1462807480/alesso_eajztb.mp3'
    }
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

  }

  getMixins(){
    return(
      <Entity>
        <a-mixin id="visualizer" geometry="primitive: box; depth: 1; height: 40; width: 5"
                                 material="color: red; opacity: 0.6;"></a-mixin>
        <a-mixin id="visualizer-ring" geometry="primitive: circle; radius:0.5"
                                 material="color: red; opacity: 0.6;"></a-mixin>
        <a-mixin id="snow" geometry="primitive: box; depth: 0.02;height: 0.04; width: 0.04" material="color: #DDD; opacity: 0.4; shader: flat"></a-mixin>
        <a-mixin id="blue-speck" geometry="primitive: box; depth: 0.03;height: 0.05; width: 0.05" material="color: #2C4659; opacity: 0.2; shader: flat"></a-mixin>
        <a-mixin id="pulse" geometry="primitive: circle;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="waveform" geometry="primitive: box; height: 0.2; depth: 0.05; width: 0.05;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="snake" geometry="primitive: box; height: 0.2; depth: 5; width: 0.2;" material="color: #72CCBC; shader: flat;" rotation="0 0 90"></a-mixin>
      </Entity>
    );
  }

  render () {
    var mixins = this.getMixins();
    return (
      <Scene stats canvas="canvas: #mycanvas; height: 50; width:50;">
        <a-assets>
          {mixins}
        </a-assets>
        <Audio  audioSrc={this.state.song} frequencySize={BoilerplateScene.frequencySize}/>
        <Camera position={[0,10,100]}>
          <Cursor />
        </Camera>
        <Sky color='#1D2327'/>
        <Pulse heights={this.state.heights}/>
        <Waveform heights={this.state.heights}/>
      </Scene>
    );

    //           <RainingObjects animationDirection='alternate' mixin='snow' spread="25" numElements="250"/>
          // <Pulse heights={this.state.heights}/>
          // <Waveform heights={this.state.heights}/>
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

class Waveform extends React.Component{
  static defaultProps = {
    numBlocks: 128
  };

  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.heights !== this.props.heights;
  }
  render(){
    var blocks = [];
    for (var i = 0;i < this.props.numBlocks; i++){
      var v = this.props.heights[i]/16;
      var y = v * 1/2;
      blocks.push(
        <Entity>
          <Entity mixin="waveform" position={[0,y,0]}/>
        </Entity>
      );
    }
    return(
      <Entity layout={{type: 'circle', radius: 8}} >
        <Animation attribute="rotation" to="0 360 0" dur="50000" repeat="indefinite" direction="alternate"/>
        {blocks}
      </Entity>
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
    return nextProps.heights !== this.props.heights;
  }
  render(){
    var blocks = [];
    for (var i = 0;i < this.props.numBlocks; i++){
      blocks.push(
        <Entity mixin="pulse" geometry={{radius:this.props.heights[i]/50 }} position={[0,0,i]} />
      );
    }
    return(<Entity cursor-listener class="lookable" look-at='[camera]'>{blocks}</Entity>);
  }

}

class VisualizerBlock extends React.Component{
  static defaultProps = {
    numBlocks: 16
  };

  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.heights !== this.props.heights;
  }
  render(){
    var blocks = [];
    var multiplier = 16;
    var startingX = multiplier * this.props.numBlocks/2 * -1;
    var startingZ = startingX;
    for (var i = 0;i < this.props.numBlocks; i++){
      blocks.push(
      <Entity>
        <Entity position={[startingX,-0.5,(startingZ+i*multiplier)]} mixin="visualizer" geometry={{height:this.props.heights[i] }} material={{color:'blue'}}  look-at="[camera]" />
        <Entity position={[-1*startingX,-0.5,(startingZ+i*multiplier)]} mixin="visualizer" geometry={{height:this.props.heights[i] }} material={{color:'green'}}  look-at="[camera]" />
        <Entity position={[0,-0.5,-250+i]} mixin="visualizer-ring" geometry={{"radius":this.props.heights[i+2] }} look-at="[camera]" material={{color: 'orange'}}></Entity>
      </Entity>
      );
    }
    return(<Entity>{blocks}</Entity>);
  }
}

// window.Perf = Perf;
ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));

