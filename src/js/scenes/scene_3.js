import {Animation, Entity, Scene} from 'aframe-react';

import SceneTemplate from './scene_template';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';

import Sky from '../components/Sky';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Audio from '../components/Audio';
import '../aframe_components/entity-generator';
import Lasers from '../components/Laser';
class Scene3 extends SceneTemplate{
  constructor(props){
    super(props);
    this.state.song ='https://cdn.rawgit.com/FlexingDream/aframe_demo/master/src/audio/alesso.mp3'; 
    
  }
  getMixins(){
    return(
      <Entity>
        <a-mixin id="starPrimitive" geometry="primitive: circle; radius: 0.5;" material="color: #FFEE35;" look-at='[camera]'/>
        <a-mixin id="moon" geometry="primitive: circle; radius: 0.5;" material="color: #FFEE35;" position="100 300 100" look-at='[camera]'/>
        <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
      <a-asset-item id="star" src="../3d_models/star.dae"></a-asset-item>
      <a-asset-item id="tree" src="../3d_models/tree.dae"></a-asset-item>
      <a-asset-item id="ground" src="../3d_models/dirt_ground.dae"></a-asset-item>
      <a-asset-item id="saturn" src="../3d_models/saturn.dae"></a-asset-item>
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

  shouldUpdateFrequencies(heights){
    if (!_.isEqual(heights,this.state.heights))
      this.setState({heights: heights});
  }

  render(){
    return(
    <Scene stats>
      {this.getAssets()}
      <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
      <Camera position={[0,1,0]}>
        <Cursor />
      </Camera>
      <Sky color='#111416'/>
      <Stars/>
      <Lasers/>
      <Forest/>
      <Entity collada-model='#ground' position="-200 -2.8 -200"/>
      <Entity collada-model='#saturn' position="-300 400 -300" class="clickable">
        <Animation attribute="rotation" to="360 360 360" repeat="indefinite" ease="ease-linear" dur="60000"/>
      </Entity>
    </Scene>);
  }
}
class Forest extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(){
    return false;
  }

  render(){
    return(      
      <Entity entity-generator-collada="collada: #tree; numElements: 50; spread: 25; minExclusion: 0;maxExclusion: 2;" >  
      </Entity>
    );
  }
}
class Moon extends React.Component{
  static defaultProps = {
    numBlocks: 1
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
      mixin: "circlePulse",
    },null);
    for (var i = 0;i < this.props.numBlocks; i++){
      var height = this.props.heights[i] == 0 ? 1 : this.props.heights[i]/50;
      var newElement = React.cloneElement(template, {
        // position: [0,0,], 
        key: i, 
        geometry: {radius: height}
      },null);
      // var newElement = React.cloneElement(template, {position: [0,0,i], geometry: {radius: height}, key: i},null);
      elements.push(newElement);
    }
    return(<Entity>
      {elements}
    </Entity>);
  }
}

class Stars extends React.Component{
  constructor(props){
    super(props);
  }

  shouldComponentUpdate(){
    return false;
  }

  render(){
    return(
      <Entity entity-generator-primitive="mixin: starPrimitive; numElements: 100; spread: 500; minExclusion: 0;maxExclusion: 50;" >  
        <Animation attribute='rotation' to='0 90 0' ease='ease-linear' repeat='indefinite' dur="60000" direction='alternate'/>
      </Entity>
    );
  }
}

ReactDOM.render(<Scene3/>, document.querySelector('.scene-container'));