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
import '../aframe_components/entity-generator';
import 'aframe-text-component';
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
      song: 'https://cdn.rawgit.com/FlexingDream/aframe_demo/pua/src/audio/port_rob_full.mp3'
    }
  }
  shouldUpdateFrequencies(heights){
  }

  getMixins(){
    return(
      <Entity>
        <a-mixin id="starPrimitive" geometry="primitive: circle; radius: 0.5;" material="color: #FFEE35;" look-at='[camera]'/>

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
        <a-asset-item id="gradient-sky-asset" src="../3d_models/gradient-sky.dae"></a-asset-item>
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
    this.captureSongStart();
  }

  startSong(){
    document.getElementById('scene').removeEventListener('song_loaded',this.startSong,false);

    document.getElementById('intro').emit('start_intro');
  }

  startIntro(){
    document.getElementById('intro').removeEventListener('start_intro',this.startIntro,false);

    document.getElementsByClassName("intro-text")[0].emit("reveal");
    setTimeout(function(){
      document.getElementsByClassName("intro-text")[1].emit("reveal");
      setTimeout(function(){
        document.getElementsByClassName("intro-text")[2].emit("reveal");
        setTimeout(function(){
          document.getElementById('part_1').emit('start_part1');
        },1000);
      },600);
    },2000);
  }

  startPart1(){
    document.getElementById('part_1').removeEventListener('start_part1',this.startPart1,false);
    $("#intro").remove();

    setTimeout(function(){
      document.getElementById("hand").emit("show_hand");
      setTimeout(function(){
        document.getElementById("hand").emit("rotate_hand");
      },4000);
    },4000);

    setTimeout(function(){
      // document.getElementById("world_light").emit("dim_light");
      document.getElementById("part_2").emit("start_part2");
    },40000);
  }

  startPart2(){
    document.getElementById('part_2').removeEventListener('start_part2',this.startPart2,false);
    // $("#part_1").remove();
    document.getElementById('part_2').setAttribute('visible',true);
    document.getElementById('moon').emit("move_moon");
    document.getElementById('world_light').emit('dim_light');
    document.getElementById('moon_light').emit('brighten_light');
  }

  captureSongStart(){
    document.getElementById('scene').addEventListener('song_loaded',this.startSong.bind(this),false);
    document.getElementById('intro').addEventListener('start_intro',this.startIntro.bind(this),false);
    document.getElementById('part_1').addEventListener('start_part1',this.startPart1.bind(this),false);
    document.getElementById('part_2').addEventListener('start_part2',this.startPart2.bind(this),false);
  }

  render(){
    return(
    <Scene id="scene" stats fog={{type: 'linear', near:50,color: '#1D2327'}}>
      {this.getAssets()}
      <Camera id="camera" position={[0,10,0]} wasd-controls={{enabled: false}} >
        <Cursor />
        <Animation attribute="position" to="0 0 -200" dur="160000" ease="ease-in-out" begin=""/>
        <Hand/>
        <Entity id="world_light" light={{type: 'point', distance: 200, decay: 2}}>
          <Animation attribute="light.intensity" dur="10000" to="0.4" begin="dim_light"/>
        </Entity>
      </Camera>
      <Audio  audioSrc={this.state.song} frequencySize={this.props.frequencySize} refreshRate={this.props.refreshRate} shouldUpdateFrequencies={this.shouldUpdateFrequencies.bind(this)}/>
      <Intro/>
      <Part1/>
      <Part2/>
    </Scene>);
  }
}

class Intro extends React.Component{
  render(){
    return(
    <Entity id="intro">
      <Sky color="black"/>
      <Entity position="-30 50 -50" look-at='[camera]'>
        <Entity class="intro-text" text={{text: "IS ANYONE THERE?",height: 1, size: 5}}  material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
        </Entity>
        <Entity class="intro-text" text={{text: "OH - ",height: 1, size: 5}}  position="0 -10 0" material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
        </Entity>
        <Entity class="intro-text" text={{text: "HI!",height: 1, size: 5}}  position="0 -20 0" material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
        </Entity>
        <Entity class="intro-text" text={{text: "Porter Robinson - Sad Machine",height: 1, size: 8}}  position="5 20 0" material={{color:'white'}}/>
      </Entity>
    </Entity>
    );
  }
}

class Part1 extends React.Component{
  render(){
    return(
      <Entity id="part_1" visible="false">
        <Sky color='#0B141A'/>
        <Animation attribute="visible" to="true" begin="start_part1"/>
        <Entity collada-model="#terrain-asset" position="0 -5 0" rotation="0 0 0"/>
        <Fog/>

      </Entity>
    );
  }
}

class Part2 extends React.Component{
        // <Entity light={{type: 'point', intensity: 0.8, distance: 400}} position="0 200 0"/>

  render(){
    return(
      <Entity id="part_2" visible="false">
        <Animation attribute="position" to="0 0 -800" dur="120000" ease="ease-in-out" begin="move_moon"/>
        <Entity id="moon" collada-model='#moon-asset' position="-25 -40 -500" scale="75 75 75" rotation="180 180 140">
          <Animation attribute="position" to="-25 150 -500" dur="60000" ease="ease-in-out" begin="move_moon"/>
        </Entity>
        <Entity light={{type: 'point', distance: 300}} position="-25 -50 -480">
          <Animation attribute="light.intensity" to="1" from="0" begin="brighten_light" dur="60000"/>
        </Entity>
        <Stars/>
      </Entity>
    );
  }
}

class Stars extends React.Component{
  render(){
    return(
      <Entity entity-generator-primitive="mixin: starPrimitive; numElements: 200; spread: 500; minExclusion: 0;maxExclusion: 50;" >  
        <Animation attribute='rotation' to='0 90 0' ease='ease-linear' repeat='indefinite' dur="60000" direction='alternate'/>
      </Entity>
      );
  }
}
class Hand extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(        
      <Entity id="hand" collada-model="#hand-asset" scale="0.1 0.1 0.1" position="0 -1.4 -1.5" rotation="0 105 15" visible="false">
        <Animation attribute="position" from="0 -2.5 -1.5" to="0 -1.6 -1.5" dur="8000" ease="linear" begin="show_hand"/>
        <Animation attribute="visible" to="true" dur="8000" ease="linear" begin="show_hand"/>
        <Animation attribute="position" to="0 -1.6 -1.5" dur="10000" repeat="indefinite" direction="alternate" from="0 -1.4 -1.5" ease="ease-in-out"/>
        <Animation attribute="rotation" to ="45 270 90" from="0 105 15" direction="alternate" repeat="1" dur="15000" begin="rotate_hand" ease="linear"/>
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
        <Animation attribute="position" to="0 0 -800" dur="120000"/>
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 20 -480" material={{color: '#B38AAA', opacity: 0.2}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 60, depth: 2}} position="0 10 -478" material={{color: '#673D68', opacity: 0.4}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 10 -476" material={{color: '#A86B9F', opacity: 0.6}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 0 -474" material={{color: '#93639F', opacity: 0.8}}/>
      </Entity>
    );
  }
}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<PortRob/>, document.querySelector('.scene-container'));

