import {Animation, Entity, Scene} from 'aframe-react';
import 'aframe';
import 'aframe-layout-component';
import Perf from 'react-addons-perf';
import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Audio from '../components/Audio';
import '../aframe_components/entity-generator';
import Lasers from '../components/Laser';
import Floor from '../components/Floor';
import RainingObjects from '../components/RainingObjects';
import Waveform from '../components/Waveform';
class Scene4 extends React.Component{
  constructor(props){
    super(props);
  }
  getMixins(){
    return(
      <Entity>
        <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
        <a-mixin id="rain" geometry="primitive: box; depth: 0.2; width: 0.2; height: 2;" material="opacity: 0.1; shader:flat"></a-mixin>
        <a-mixin id="waveform" geometry="primitive: box; depth: 0.1, width: 0.3, height: 1" material="color: black, shader: flat"></a-mixin>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
      <a-asset-item id="speaker" src="../3d_models/speakers.dae"></a-asset-item>
      </Entity>
    );
  }

  getAssets(){

    var mixins = this.getMixins();
    var models = this.getModels();
    return(
      <a-assets>
        {models}
        {mixins}
      </a-assets>
      );
  }

  render(){
    return(
    <Scene stats>
      {this.getAssets()}
      <Camera position={[0,1,0]}>
        <Cursor />
      </Camera>
      <Room/>
      <Stage/>
      <Floor color='gray' />
      <Lasers type='line' numBlocks="20" position="0 0 0"/>
      <Lasers type='line' numBlocks="20" position="5 0 5"/>
      <Stands/>
    </Scene>);
  }
}

class Stands extends React.Component{
  render(){
    return(
      <Entity>
        <Entity geometry="primitive: box; height: 10; depth: 3; width: 50;" position="-40 0 10" material="color: black" rotation="0 90 0">
          <Entity geometry="primitive: box; height: 20; depth: 3; width: 50;" position="0 0 -10" material="color: white" rotation="0 0 0"/>
          <Entity geometry="primitive: box; height: 40; depth: 3; width: 50;" position="0 0 -20" material="color: gray" rotation="0 0 0"/>
        </Entity>
        <Entity geometry="primitive: box; height: 10; depth: 3; width: 50;" position="40 0 10" material="color: black" rotation="0 90 0">
          <Entity geometry="primitive: box; height: 20; depth: 3; width: 50;" position="0 0 10" material="color: white" rotation="0 0 0"/>
          <Entity geometry="primitive: box; height: 40; depth: 3; width: 50;" position="0 0 20" material="color: gray" rotation="0 0 0"/>
        </Entity>
        <Entity geometry="primitive: box; height: 10; depth: 3; width: 50;" position="-40 0 70" material="color: black" rotation="0 90 0">
          <Entity geometry="primitive: box; height: 20; depth: 3; width: 50;" position="0 0 -10" material="color: white" rotation="0 0 0"/>
          <Entity geometry="primitive: box; height: 40; depth: 3; width: 50;" position="0 0 -20" material="color: gray" rotation="0 0 0"/>
        </Entity>
        <Entity geometry="primitive: box; height: 10; depth: 3; width: 50;" position="40 0 70" material="color: black" rotation="0 90 0">
          <Entity geometry="primitive: box; height: 20; depth: 3; width: 50;" position="0 0 10" material="color: white" rotation="0 0 0"/>
          <Entity geometry="primitive: box; height: 40; depth: 3; width: 50;" position="0 0 20" material="color: gray" rotation="0 0 0"/>
        </Entity>
        <Entity geometry="primitive: box; height: 10; depth: 3; width: 50;" position="0 0 100" material="color: black" rotation="0 0 0">
          <Entity geometry="primitive: box; height: 20; depth: 3; width: 50;" position="0 0 10" material="color: white" rotation="0 0 0"/>
          <Entity geometry="primitive: box; height: 40; depth: 3; width: 50;" position="0 0 20" material="color: gray" rotation="0 0 0"/>
        </Entity>
      </Entity>
    );
  }
}

class StageProps extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){
    return(<Entity>
        <Entity collada-model='#speaker' position="40 -30 10" class="" rotation="0 0 0"/>
        <Entity collada-model='#speaker' position="-60 -30 10" class="" rotation="0 0 0"/>
      </Entity>);
  }
}

class Stage extends React.Component{
  static defaultProps = {
    frequencySize : 20,
    refreshRate: 150
  };
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      song:'https://rawgit.com/FlexingDream/aframe_demo/master/src/audio/mountains.mp3'
    }
  }

  shouldUpdateFrequencies(heights){
    if (!_.isEqual(heights,this.state.heights))
      this.setState({heights: heights});
  }

  render(){
    return(
      <Entity geometry={{primitive: 'box',height: 60,width:100,depth:10}}
          material={{color: 'white', shader: 'flat'}} position=" 0 30 -60">
        <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
        <Entity geometry={{primitive: 'box', height: 10, width: 90, depth: 5}} material={{color: 'gray'}} position="0 -30 10"/>
        <Waveform heights={this.state.heights} type='line' position="-16 2 12" numBlocks='16'/>
        <Curtains/>
        <StageProps/>
      </Entity>
    );
  }
}

class Curtains extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render(){
    return (
      <Entity id="curtain">
        <Entity geometry={{primitive: 'box', height: 100, width: 45, depth: 2}}  position="-22.5 0 12" id="curtain-left"> 
          <Animation attribute="geometry.width" to="0" ease="linear" dur="6000" begin='start'/>
          <Animation attribute="geometry.height" to="0" ease="linear" dur="6000" begin='start'/>
          <Animation attribute="geometry.depth" to="0" ease="linear" dur="6000" begin='start'/>
        </Entity>
        <Entity geometry={{primitive: 'box', height: 100, width: 45, depth: 2}}  position="22.5 0 12" id="curtain-right"> 
          <Animation attribute="geometry.width" to="0" ease="linear" dur="6000" begin='start'/>
          <Animation attribute="geometry.height" to="0" ease="linear" dur="6000" begin='start'/>
          <Animation attribute="geometry.depth" to="0" ease="linear" dur="6000" begin='start'/>
        </Entity>
      </Entity>
    );
  }
}

class Room extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  render(){
    return(
      <Entity geometry={{primitive: 'box', height: 250, width: 250, depth: 250}} material={{color: '#1D2327'}} scale="1 1 -1">
      </Entity>
    );
  }

}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;

ReactDOM.render(<Scene4/>, document.querySelector('.scene-container'));

