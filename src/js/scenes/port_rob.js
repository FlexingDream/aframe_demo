import {Animation, Entity, Scene} from 'aframe-react';
import 'aframe';
import 'aframe-layout-component';
import AframeExtras from 'aframe-extras';
import Perf from 'react-addons-perf';
import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'underscore';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Audio from '../components/Audio';
import Sky from '../components/Sky';
// import '../aframe_components/three-model.js';
AframeExtras.loaders.registerAll();

class PortRob extends React.Component{
  static defaultProps = {
    frequencySize : 0,
    refreshRate: 0
  };
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      song: 'https://cdn.rawgit.com/FlexingDream/aframe_demo/pua/src/audio/port_rob_cut.mp3'
    }
  }
  shouldUpdateFrequencies(heights){
  }

  getMixins(){
    return(
      <Entity>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
        <a-asset-item id="moon-asset" src="../3d_models/moon.dae"></a-asset-item>
        <a-asset-item id="terrain-asset" src="../3d_models/terrain.dae"></a-asset-item>
        <a-asset-item id="hand-asset" src="../3d_models/hand.dae"></a-asset-item>
        <a-asset-item id="valley-asset" src="../3d_models/valley.dae"></a-asset-item>
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


  componentDidMount(){
    console.log('test');
    this.captureSongStart();
  }

  startSong(){
    document.getElementById('scene').removeEventListener('song_loaded',this.startSong,false);
    document.querySelector('#camera').emit('start_song');
    document.querySelector('#moon').emit('start_song');
  }

  captureSongStart(){
    document.getElementById('scene').addEventListener('song_loaded',this.startSong,false);
  }

  render(){
    return(
    <Scene id="scene" stats fog={{type: 'linear', near:50,color: '#1D2327'}}>
      {this.getAssets()}
      <Camera id="camera" position={[0,10,0]} wasd-controls={{enabled: false}} >
        <Cursor />
        <Animation attribute="position" to="0 0 -100" dur="80000" ease="ease-in-out" begin="start_song"/>
        <Hand/>

      </Camera>
      <Entity light={{type: 'directional', intensity: 0.9}} position="0 100 0"/>
      <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
      <Sky color='#0B141A'/>
      <Entity id="moon" collada-model='#moon-asset' position="0 0 -500" scale="75 75 75" rotation="180 180 140">
        <Animation attribute="position" to="0 100 -500" dur="60000" ease="ease-in-out" begin="start_song"/>
      </Entity>
      <Entity collada-model="#terrain-asset" position="0 -5 0" rotation="0 90 0"/>
      <Valley/>
      <Fog/>
    </Scene>);
  }
}

class Hand extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(        
      <Entity collada-model="#hand-asset" scale="0.1 0.1 0.1" position="0 -1.4 -1.5" rotation="0 105 15">
        <Animation attribute="position" to="0 -1.6 -1.5" dur="10000" repeat="indefinite" direction="alternate" from="0 -1.4 -1.5" ease="ease-in-out"/>
      </Entity>
  );
  }
}

class Valley extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (<Entity id="valley" collada-model="#valley-asset" position="0 -5 -300" rotation="0 180 0" visible="false" />);
  }
}

class Fog extends React.Component{
  render(){

    return(
      <Entity>
        <Entity geometry={{primitive: 'box', width: 800, height: 25, depth: 2}} position="0 20 -480" material={{color: '#B38AAA', opacity: 0.2}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 25, depth: 2}} position="0 10 -478" material={{color: '#673D68', opacity: 0.4}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 25, depth: 2}} position="0 10 -476" material={{color: '#A86B9F', opacity: 0.6}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 50, depth: 2}} position="0 0 -474" material={{color: '#93639F', opacity: 0.8}}/>
      </Entity>
    );
  }
}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<PortRob/>, document.querySelector('.scene-container'));

