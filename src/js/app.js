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

class BoilerplateScene extends React.Component {
  static frequencySize = 64;

  constructor(props) {
    super(props);
    var heights = Array.apply(null,Array(BoilerplateScene.frequencySize)).map(function(x,i){return 0.5});
    this.state = {
      heights: heights,
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      song: 'audio/alesso.mp3'
    }
  }

  getMixins(){
    return(
      <Entity>
        <a-mixin id="tree-base" geometry="primitive: box; height: 2.4; depth: 0.8; width: 0.8" material="color: #623B1C" position={[0,0,0]}></a-mixin>
        <a-mixin id="tree-leaf" geometry="primitive: box; height: 1.2; depth: 1.5; width: 1.5" material="color: green" position={[0,1.8,0]}></a-mixin>
        <a-mixin id="visualizer" geometry="primitive: box; depth: 1; height: 40; width: 5"
                                 material="color: red; opacity: 0.6;"></a-mixin>
        <a-mixin id="visualizer-ring" geometry="primitive: circle; radius:2"
                                 material="color: red; opacity: 0.6;"></a-mixin>
        <a-mixin id="snow" geometry="primitive: box; depth: 0.02;height: 0.04; width: 0.04" material="color: #DDD; opacity: 0.4; shader: flat"></a-mixin>
        <a-mixin id="blue-speck" geometry="primitive: box; depth: 0.03;height: 0.05; width: 0.05" material="color: #2C4659; opacity: 0.2; shader: flat"></a-mixin>
        <a-mixin id="stars" geometry="primitive: box; depth: 0.1;height: 0.1; width: 0.1"
                          material="color: #F99705; shader: flat"
                          ></a-mixin>
        <a-mixin id="pulse" geometry="primitive: circle; radius: 5;" material="color: white; opacity: 0.8; shader:flat;" position="0 0 0" ></a-mixin>
        <a-mixin id="snake" geometry="primitive: box; height: 0.2; depth: 5; width: 0.2;" material="color: #72CCBC; shader: flat;" rotation="0 0 90"></a-mixin>
      </Entity>
    );
  }

  render () {
    var mixins = this.getMixins();
    return (
      <Scene stats>
        <a-assets>
          {mixins}
        </a-assets>
        <Audio  audioSrc={this.state.song}/>
        <Camera position={[0,0,20]}>
          <Cursor />
        </Camera>
        <Sky color='#1D2327'/>
        <Entity>
          <RainingObjects animationDirection='alternate' mixin='snow' spread="75"/>
          <RainingObjects animationDirection='alternate' mixin='blue-speck' numElements="1000"/>
          <Pulse heights={this.state.heights}/>
          <SnakeLines heights={this.state.heights}/>
        </Entity>
      </Scene>
    );
  }
}

class SnakeLines extends React.Component{
  static defaultProps = {
    numBlocks: 25,
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
    numBlocks: 8
  };

  constructor(props){
    super(props);
  }

  render(){
    var blocks = [];
    for (var i = 0;i < this.props.numBlocks; i++){
      blocks.push(
        <Entity mixin="pulse" geometry={{radius:this.props.heights[i]/50 }} position={[0,0,i]} />
      );
    }
    return(<Entity look-at='[camera]'>{blocks}</Entity>);
  }

}

class VisualizerBlock extends React.Component{
  static defaultProps = {
    numBlocks: 16
  };

  constructor(props){
    super(props);
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

var PassingObjects = React.createClass({
  getDefaultProps(){
    return{
      geometry:{
        primitive: 'box',
        height: 3,
        width: 1,
        depth: 1
      },
      material:{
        color: 'gray'
      }
    }
  },
  // running objects passing on both sides
  render(){

    var leftItems =[];
    var rightItems = [];
    var number = 4;
    for (var i =0;i<number;i++){
      leftItems.push(<Entity class="lookable" geometry={this.props.geometry} position={[-5,-0.5,-2*i]} material={this.props.material}></Entity>);
      rightItems.push(<Entity class="lookable" geometry={this.props.geometry} position={[5,-0.5,-2*i]} material={this.props.material}></Entity>);
    }
    return(
      <Entity>
        <Animation attribute="position" dur="60000" easing="linear" repeat="indefinite" to="0 0 200" />
        {leftItems}
        {rightItems}
      </Entity>
    );

  }
});



class Stars extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Entity entity-generator-stars="mixin: stars; num: 250; minExclusion:0;maxExclusion:30;">
        <Animation attribute="rotation" dur="16000" easing="linear" repeat="indefinite" to="360 360 0" />
      </Entity>
      );
  }
}

class Tree extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity entity-generator-trees="mixinTree:tree-base; mixinLeaf:tree-leaf; minExclusion: -10, maxExclusion: 10"></Entity>
      );
  }
}

ReactDOM.render(<BoilerplateScene/>, document.querySelector('.scene-container'));

