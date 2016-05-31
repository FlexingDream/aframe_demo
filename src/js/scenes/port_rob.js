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
import RainingObjects from '../components/RainingObjects';
import '../fonts/digital_dream_reg';
// import '../aframe_components/three-model.js';
AframeExtras.loaders.registerAll();

var MODEL_LOCATION = "3d_models/";

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
      // song: 'https://cdn.rawgit.com/FlexingDream/aframe_demo/pua/src/audio/port_rob_full.mp3',
      song: 'audio/port_rob_full.mp3',
      // song: 'https://res.cloudinary.com/dtniqc2hg/video/upload/q_63/v1464656484/port_rob_full_kzzetz.mp3',
      fogColour: '#F97B8E',
      shouldPlay: true,
      stage: 0
    }
  }
  shouldComponentUpdate(nextProps,nextState){
    if (nextState.fogColour != this.state.fogColour) return true;
    else if (nextState.shouldPlay == false) return true;
    else if (nextState.stage != this.state.stage) return true;
    else return false;
  }

  getMixins(){
    return(
      <Entity>
        <a-mixin id="starPrimitive" geometry="primitive: circle; radius: 0.5;" material="color: #FFEE35;" look-at='[camera]'/>
        <a-mixin id="snow" geometry="primitive: box; depth: 0.02;height: 0.04; width: 0.04" material="color: #DDD; opacity: 0.4; shader: flat"></a-mixin>
        <a-mixin id="font" text="font: digital dream skew narrow; height: 0.5; size: 5"></a-mixin>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
        <a-asset-item id="moon-asset" src={MODEL_LOCATION+"moon.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-0" src={MODEL_LOCATION+"terrain_0.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-1" src={MODEL_LOCATION+"terrain_1.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-a" src={MODEL_LOCATION+"terrain_a.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-b" src={MODEL_LOCATION+"terrain_b.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-c" src={MODEL_LOCATION+"terrain_c.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-d" src={MODEL_LOCATION+"terrain_d.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-e" src={MODEL_LOCATION+"terrain_e.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-x" src={MODEL_LOCATION+"terrain_x.dae"}></a-asset-item>
        <a-asset-item id="terrain-asset-y" src={MODEL_LOCATION+"terrain_y.dae"}></a-asset-item>

        <a-asset-item id="ready-btn-asset" src={MODEL_LOCATION+"readybtn.dae"}></a-asset-item>
        <a-asset-item id="hand-asset" src={MODEL_LOCATION+"hand.dae"}></a-asset-item>
        <a-asset-item id="valley-asset" src={MODEL_LOCATION+"valley.dae"}></a-asset-item>
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

  showTimer(){
    var timestamp = document.createElement('span');document.body.appendChild(timestamp);timestamp.style.position='absolute';timestamp.style.top = '20px';timestamp.style.right = '20px';var ascene=document.querySelector('a-scene');
    window.setInterval(function(){timestamp.textContent = parseFloat(ascene.time/1000).toFixed(2)}, 100);
  }

  componentDidMount(){
    this.captureSongStart();
    this.showTimer();
    // document.querySelector("#scene").setAttribute("canvas",{width: 50});
    // $("#scene").css('width','%');
    var that = this;
    document.getElementById('scene').addEventListener('change_black',function(){
      that.setState({fogColour:'#1A1D23'});
    },false);
    document.getElementById('scene').addEventListener('change_white',function(){
      that.setState({fogColour:'white'});
    },false);
  }
  songLoaded(){
    document.getElementById('scene').removeEventListener('song_loaded',this.startSong,false);

    var chainEvents= [] ;
    // document.getElementsByClassName("loading")[0].emit('hide');
    chainEvents.newChainEvent(".loading","hide",0);
    chainEvents.newChainEvent("#loaded-msg","show",0);
    chainEvents.newChainEvent(".ready-btn","show",0);

    chainEvents.reverse();
    this.chainTimingEvents(chainEvents);

  }

  startSong(){
    document.getElementById('scene').removeEventListener('start_song',this.startSong,false);
    document.getElementById('loaded-msg').emit('hide');
    var node = $(".audio-player").data("node");
    node.start(0);
    document.getElementById('intro').emit('start_intro');
  }

  startIntro(){
    var chainEvents = [];

    document.getElementById('intro').removeEventListener('start_intro',this.startIntro,false);
    document.getElementsByClassName("loading")[0].emit('hide');
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
    this.setState({stage: 1});
    var chainEvents = [];
    chainEvents.newChainEvent("#camera","part_1",0);
    chainEvents.newChainEvent("#hand","show_hand",4000);
    chainEvents.newChainEvent("#hand","rotate_hand",8000);
    // chainEvents.newChainEvent("#hand","start_movement",4000);
    chainEvents.reverse();
    var that = this;
    this.chainTimingEvents(chainEvents);
    setTimeout(function(){
      document.getElementById("part_2").emit("start_part2");
      that.setState({stage: 2});
    },40000);
  }

  startPart2(){
    document.getElementById('part_2').removeEventListener('start_part2',this.startPart2,false);
    document.getElementById('part_2').setAttribute('visible',true);
    document.getElementById('moon').emit("move_moon");


    var chainEvents = [];

    chainEvents.newChainEvent("#scene","change_black",0);
    chainEvents.newChainEvent("#part_2 .group_1 > a-entity:nth-child(2) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_1 > a-entity:nth-child(3) > a-entity","reveal",3000);
    chainEvents.newChainEvent("#part_2 .group_1 > a-entity:nth-child(4) > a-entity","reveal",3000);
    chainEvents.newChainEvent("#part_2 .group_1","hide_group_1",4000);
    chainEvents.newChainEvent("#part_2 .group_1_5 > a-entity:nth-child(2) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_1_5 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_1_5 > a-entity:nth-child(4) > a-entity","reveal",4000);
    chainEvents.newChainEvent("#part_2 .group_1_5 > a-entity:nth-child(5) > a-entity","reveal",1000);

    chainEvents.newChainEvent("#part_2 .group_1_5","hide_group_1_5",2000);
    chainEvents.newChainEvent("#part_2 .group_2 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_2 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_2","hide_group_2",3000);
    chainEvents.newChainEvent("#part_2 .group_3 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_3 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_3 > a-entity:nth-child(4) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_3 > a-entity:nth-child(5) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_3 > a-entity:nth-child(6) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_3","hide_group_3",2000);
    chainEvents.newChainEvent("#part_2 .group_4 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_4 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_4","hide_group_4",2000);

    chainEvents.newChainEvent("#part_2 .group_5 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_5 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_5","hide_group_5",3000);
    chainEvents.newChainEvent("#part_2 .group_6 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_6 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_6 > a-entity:nth-child(4) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_6 > a-entity:nth-child(5) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_6 > a-entity:nth-child(6) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_2 .group_6","hide_group_6",2000);
    chainEvents.newChainEvent("#part_2 .group_7 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_2 .group_7 > a-entity:nth-child(3) > a-entity","reveal",2000);

    chainEvents.newChainEvent("#part_1","hide",0);
    chainEvents.newChainEvent("#part_2","hide",0);
    chainEvents.newChainEvent('#part_3',"start_part3",0);

    chainEvents.reverse();
    this.chainTimingEvents(chainEvents);
  }
  startPart3(){
    document.getElementById('part_3').removeEventListener('start_part3',this.startPart3,false);
    this.setState({stage: 3});
    var chainEvents = [];
    chainEvents.newChainEvent('#part_3',"reveal",500);
    chainEvents.newChainEvent('#part_3 a-entity > .part3-text',"reveal",1000);
    chainEvents.newChainEvent('#part_3','hide',2000);
    chainEvents.newChainEvent('#part_4',"start_part4",0);

    chainEvents.reverse();
    this.chainTimingEvents(chainEvents);
  }

  startPart4(){
    document.getElementById('part_4').removeEventListener('start_part4',this.startPart4,false);
    this.setState({stage: 4});

    var chainEvents = [];

    chainEvents.newChainEvent('#part_4','reveal_part4',0);
    // chainEvents.newChainEvent("#camera","part_4",0);

    chainEvents.newChainEvent("#scene","change_white",0);
    chainEvents.newChainEvent("#part_4 .group_1 > a-entity:nth-child(2) > a-entity","reveal",41000);
    chainEvents.newChainEvent("#part_4 .group_1 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_4 .group_1 > a-entity:nth-child(4) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_4 .group_1","hide",2000);

    chainEvents.newChainEvent("#part_4 .group_2 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_2 > a-entity:nth-child(3) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_4 .group_2 > a-entity:nth-child(4) > a-entity","reveal",2000);
    chainEvents.newChainEvent("#part_4 .group_2","hide",1000);

    chainEvents.newChainEvent("#part_4 .group_3 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_3 > a-entity:nth-child(3) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_3 > a-entity:nth-child(4) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_3","hide",2000);

    chainEvents.newChainEvent("#part_4 .group_4 > a-entity:nth-child(2) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_4 > a-entity:nth-child(3) > a-entity","reveal",1500);
    chainEvents.newChainEvent("#part_4 .group_4 > a-entity:nth-child(4) > a-entity","reveal",1000);
    chainEvents.newChainEvent("#part_4 .group_4","hide",2000);

    chainEvents.newChainEvent("#part_4","hide_part4",0);
    // chainEvents.newChainEvent('#part_5',"start_part5",0);
    chainEvents.newChainEvent("#scene","song_finished",10000);

    chainEvents.reverse();
    this.chainTimingEvents(chainEvents);
  }

  startPart5(){
    /*    chainEvents.newChainEvent("#part_5","reveal_part5",0);
        // chainEvents.newChainEvent("#camera","part_5",0);

        chainEvents.newChainEvent("#scene","change_black",0);
        chainEvents.newChainEvent("#moon","move_moon",0);
        chainEvents.newChainEvent("#part_5 .group_1 > a-entity:nth-child(2) > a-entity","reveal",20000);
        chainEvents.newChainEvent("#part_5 .group_1 > a-entity:nth-child(3) > a-entity","reveal",3000);

        chainEvents.newChainEvent("#part_5 .group_1","hide_group_1",1000);
        chainEvents.newChainEvent("#part_5 .group_2 > a-entity:nth-child(2) > a-entity","reveal",1000);
        chainEvents.newChainEvent("#part_5 .group_2 > a-entity:nth-child(3) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_2 > a-entity:nth-child(4) > a-entity","reveal",3000);
        chainEvents.newChainEvent("#part_5 .group_2 > a-entity:nth-child(5) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_2 > a-entity:nth-child(6) > a-entity","reveal",2000);

        chainEvents.newChainEvent("#part_5 .group_2","hide_group_2",2000);
        chainEvents.newChainEvent("#part_5 .group_3 > a-entity:nth-child(2) > a-entity","reveal",1000);
        chainEvents.newChainEvent("#part_5 .group_3 > a-entity:nth-child(3) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_3","hide_group_3",2000);
        chainEvents.newChainEvent("#part_5 .group_4 > a-entity:nth-child(2) > a-entity","reveal",1000);
        chainEvents.newChainEvent("#part_5 .group_4 > a-entity:nth-child(3) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_4","hide_group_4",2000);

        chainEvents.newChainEvent("#part_5 .group_5 > a-entity:nth-child(2) > a-entity","reveal",1000);
        chainEvents.newChainEvent("#part_5 .group_5 > a-entity:nth-child(3) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_5 > a-entity:nth-child(4) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_5 > a-entity:nth-child(5) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_5 > a-entity:nth-child(6) > a-entity","reveal",2000);

        chainEvents.newChainEvent("#part_5 .group_5","hide_group_5",3000);
        chainEvents.newChainEvent("#part_5 .group_6 > a-entity:nth-child(2) > a-entity","reveal",1000);
        chainEvents.newChainEvent("#part_5 .group_6 > a-entity:nth-child(3) > a-entity","reveal",2000);
        chainEvents.newChainEvent("#part_5 .group_6","hide_group_6",2000);

        chainEvents.newChainEvent("#part_6","show",2000);*/
  }


  endSong(){
    document.getElementById('scene').removeEventListener('song_finished',this.endSong,false);
    this.setState({shouldPlay: false});

    var chainEvents = [];
    chainEvents.newChainEvent("#scene","change_black",0);
    chainEvents.reverse();
    this.chainTimingEvents(chainEvents);
  }

  chainTimingEvents(chainEvents){
    if (chainEvents<=0) return;
    var that = this;
    var newEvent = chainEvents.pop();
    setTimeout(function(){
      document.querySelector(newEvent.querySelector).emit(newEvent.emitEvent);
      that.chainTimingEvents(chainEvents);
    },newEvent.delay);
  }

  captureSongStart(){
    document.getElementById('scene').addEventListener('song_loaded',this.songLoaded.bind(this),false);
    document.getElementById('scene').addEventListener('start_song',this.startSong.bind(this),false);
    document.getElementById('intro').addEventListener('start_intro',this.startIntro.bind(this),false);
    document.getElementById('part_1').addEventListener('start_part1',this.startPart1.bind(this),false);
    document.getElementById('part_2').addEventListener('start_part2',this.startPart2.bind(this),false);
    document.getElementById('part_3').addEventListener('start_part3',this.startPart3.bind(this),false);
    document.getElementById('part_4').addEventListener('start_part4',this.startPart4.bind(this),false);
    document.getElementById('scene').addEventListener('song_finished',this.endSong.bind(this),false);
  }

  render(){
    return(
    <Scene id="scene" stats fog={{color: this.state.fogColour}} canvas="width: 50; height: 10;">
      {this.getAssets()}
      <Camera id="camera" position={[0,10,0]} wasd-controls={{enabled: false}} >
        <Cursor cursor={{fuse: true, timeout: 2000}}/>
        <Animation attribute="position" to="0 0 -400" dur="200000" ease="linear" begin="part_1"/>
        <Hand/>
      </Camera>
      <Audio  audioSrc={this.state.song} shouldUpdateFrequencies="false" shouldPlay={this.state.shouldPlay}/>
      <Sky id="sky"/>
      {this.state.stage == 0 ? <Intro startSong={this.startSong}/> : ''}
      {this.state.stage  <= 2 ? <Part1/> : ''}
      {this.state.stage <=2 ? <Part2/> : ''}}
      {this.state.stage <=3 ? <Part3/> : ''}}
      {this.state.stage <=4 ? <Part4/> : ''}}
      <Ending/>
{/*      <Part5/>
      <Part6/>*/}
    </Scene>);
  }
}

class Intro extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return true;
  }

  constructor(props){
    super(props);
    this.state = {
      color: 'red'

    };
  }
  changeColor()  {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  };

  render(){
    return(
    <Entity id="intro">

      <Entity position="-30 40 -70">
        <Entity position="-2 -10 0">
          <Entity class="intro-text" mixin="font" text={{text: "IS ANYONE THERE?"}}  material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
          </Entity>
        </Entity>
        <Entity position="-2 -20 0">
          <Entity class="intro-text" mixin="font" text={{text: "OH - "}} material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
          </Entity>
        </Entity>
        <Entity position="-2 -30 0">
          <Entity class="intro-text" mixin="font" text={{text: "HI!"}} material={{color:'white'}} visible="false">
          <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
          </Entity>
        </Entity>
        <Entity position="-80 10 -20">
          <Entity class="intro-text" mixin="font" text={{text: "Porter Robinson - Sad Machine", size: 8}} material={{color:'white'}}/>
        </Entity>
        <Entity position="-2 -30 0">
          <Entity class="loading" mixin="font" text={{text: "Loading..."}} material={{color:'white'}} visible="true">
          <Animation attribute="visible" dur="400" to="false" begin="hide"/>
          </Entity>
        </Entity>
        <Entity position="-50 -60 0">
          <Entity  id="loaded-msg" mixin="font" text={{text: "Click the button to start"}} material={{color:'white'}} visible="false">
            <Animation attribute="visible" dur="400" to="false" begin="hide"/>
            <Animation attribute="visible" dur="0" to="true" begin="show"/>
          </Entity>
          <Entity  class="ready-btn" collada-model="#ready-btn-asset" position="77 28 68" scale="0.25 0.25 0.25" visible="false" onClick={this.props.startSong}>
            <Animation attribute="visible" dur="400" to="false" begin="click"/>
            <Animation attribute="visible" dur="0" to="true" begin="show"/>
          </Entity>
        </Entity>
      </Entity>
    </Entity>
    );
  }
}

class Part1 extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){
    return(
      <Entity id="part_1" visible="false">
        <Animation attribute="visible" to="false" begin="hide"/>
        <Animation attribute="visible" to="true" begin="start_part1"/>
        <Entity collada-model="#terrain-asset-y" position="0 -10 0" rotation="0 0 0" scale="1 1 1"/>
        <Entity collada-model="#terrain-asset-x" position="-80 -11 0" rotation="0 0 0" scale="1 1 2"/>
        <Entity collada-model="#terrain-asset-x" position="140 -11 -1000" rotation="0 180 0" scale="1 1 2"/>
        <Entity collada-model="#terrain-asset-e" position="0 -5 5" rotation="0 0 0" scale="2 1 2"/>
      </Entity>
    );
  }
}

class Part2 extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){
    return(
      <Entity id="part_2" visible="false">
        <Animation attribute="visible" to="false" begin="hide"/>
        <Entity id="moon" collada-model='#moon-asset' position="-25 -80 -1050" scale="75 75 75" rotation="180 180 140" material="fog: false">
          <Animation attribute="position" to="-25 150 -600" dur="75000" ease="ease-in-out" begin="move_moon"/>
        </Entity>
        <Stars/>
        <Entity position="-35 70 -165" rotation="0 0 0" class="group_1">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_1"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: ">WHO SURVIVED?",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: ">SOMEBODY NEW?",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity class="part2-text" mixin="font" text={{text: ">ANYONE ELSE BUT YOU?",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity class="part2-text" mixin="font" text={{text: ">ON A LONELY NIGHT",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity class="part2-text" mixin="font" text={{text: ">WAS A BLINDING LIGHT.",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -50 0">
            <Entity class="part2-text" mixin="font" text={{text: ">A HUNDRED LEADERS",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -60 0">
            <Entity class="part2-text" mixin="font" text={{text: ">WOULD BE BORNE OF YOU.",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -175" rotation="0 0 0" class="group_1_5">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_1_5"/>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: ">ON A LONELY NIGHT",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity class="part2-text" mixin="font" text={{text: ">WAS A BLINDING LIGHT.",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity class="part2-text" mixin="font" text={{text: ">A HUNDRED LEADERS",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity class="part2-text" mixin="font" text={{text: ">WOULD BE BORNE OF YOU.",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -185" class="group_2">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_2"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "AND THOUGH I KNOW",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "SINCE YOU'VE AWAKENED HER AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -205" rotation="0 0 0" class="group_3">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_3"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE'LL GO ALONE",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity class="part2-text" mixin="font" text={{text: "AND NEVER SPEAK",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity class="part2-text" mixin="font" text={{text: "OF THIS AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -225" rotation="0 0 0" class="group_4">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_4"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -245" class="group_5">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_5"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "AND THOUGH I KNOW",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "SINCE YOU'VE AWAKENED HER AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -285" rotation="0 0 0" class="group_6">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_6"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity class="part2-text" mixin="font" text={{text: "SHE'LL GO ALONE",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity class="part2-text" mixin="font" text={{text: "AND NEVER SPEAK",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity class="part2-text" mixin="font" text={{text: "OF THIS AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -325" rotation="0 0 0" class="group_7">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_7"/>
          <Entity position="0 0 0">
            <Entity class="part2-text" mixin="font" text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity class="part2-text" mixin="font" text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
      </Entity>
    );
  }
}

class Part3 extends React.Component{
  render(){
    return(
      <Entity id="part_3" visible="false">
        <Animation attribute="visible" to="true" begin="reveal" dur="1000"/>
        <Animation attribute="visible" to="false" begin="hide" dur="1000"/>
        <Entity position="-75 40 -355" rotation="0 0 0">
          <Entity position="0 0 0">
            <Entity class="part3-text" text={{text: ">I'LL DEPEND ON YOU", size: 15}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
      </Entity>
    );
  }
}

class Part4 extends React.Component{
  render(){
    return(
      <Entity id="part_4" visible="false">
        <Animation attribute="visible" to="true" begin="reveal_part4"/>
        <Animation attribute="visible" to="false" begin="hide_part4"/>
        <Entity collada-model="#valley-asset" position="0 -5 200" rotation="0 0 90">
          <Animation attribute="rotation" to="0 0 360" from="0 0 0" repeat="indefinite" dur="120000" ease="linear"/>
        </Entity>
        <Entity position="-35 40 -450">
          <Entity position="0 0 -20" rotation="0 0 0" class="group_1">
            <Animation attribute="visible" to="false" dur="5000" begin="hide"/>

            <Entity position="0 0 0">
              <Entity class="part4-text" mixin="font" text={{text: ">I DON'T KNOW MUCH",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -10 0">
              <Entity class="part4-text" mixin="font" text={{text: "ABOUT YOUR LIFE",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -20 0">
              <Entity class="part4-text" mixin="font" text={{text: "BEYOND THESE WALLS",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
          </Entity>
          <Entity position="0 0 -40" rotation="0 0 0" class="group_2">
            <Animation attribute="visible" to="false" dur="5000" begin="hide"/>
            <Entity position="0 0 0">
              <Entity class="part4-text" mixin="font" text={{text: "THE FLEETING SENSE",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -10 0">
              <Entity class="part4-text" mixin="font" text={{text: "OF LOVE WITHIN THESE",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -20 0">
              <Entity class="part4-text" mixin="font" text={{text: "GODFORSAKEN WALLS",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
          </Entity>
          <Entity position="0 0 -60" rotation="0 0 0" class="group_3">
            <Animation attribute="visible" to="false" dur="5000" begin="hide"/>
            <Entity position="0 0 0">
              <Entity class="part4-text" mixin="font" text={{text: "AND YOU CAN HEAR IT",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -10 0">
              <Entity class="part4-text" mixin="font" text={{text: "IN HIS VOICE IN",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -20 0">
              <Entity class="part4-text" mixin="font" text={{text: "EVERY CALL",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
          </Entity>
          <Entity position="0 0 -80" rotation="0 0 0" class="group_4">
            <Animation attribute="visible" to="false" dur="5000" begin="hide"/>
            <Entity position="0 0 0">
              <Entity class="part4-text" mixin="font" text={{text: "THIS GIRL WHO'S SLEPT",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -10 0">
              <Entity class="part4-text" mixin="font" text={{text: "A HUNDRED YEARS HAS ",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
            <Entity position="0 -20 0">
              <Entity class="part4-text" mixin="font" text={{text: "SOMETHING AFTER ALL",height: 0.5, size: 5}} material={{color:'black'}} visible="false">
                <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
              </Entity>
            </Entity>
          </Entity>
        </Entity>
      </Entity>
    );
  }
}

class Part5 extends React.Component{
  render(){
    return(
      <Entity id="part_5" visible="false">
        <Animation attribute="visible" to="false" begin="hide"/>
        <Animation attribute="visible" to="true" begin="reveal_part5"/>
        <Entity id="moon" collada-model='#moon-asset' position="-25 -80 -800" scale="75 75 75" rotation="180 180 140" material="fog: false">
          <Animation attribute="position" to="-25 150 -600" dur="75000" ease="ease-in-out" begin="move_moon"/>
        </Entity>
        <Stars/>
        <Entity position="-35 70 -485" class="group_1">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_1"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "AND THOUGH I KNOW",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "SINCE YOU'VE AWAKENED HER AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -505" rotation="0 0 0" class="group_2">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_2"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity  text={{text: "I'LL GO ALONE",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity  text={{text: "AND NEVER SPEAK",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity  text={{text: "OF YOU AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -525" rotation="0 0 0" class="group_3">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_3"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -565" class="group_4">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_4"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "AND THOUGH I KNOW",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "SINCE YOU'VE AWAKENED HER AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -585" rotation="0 0 0" class="group_5">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_5"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "SHE DEPENDS ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -20 0">
            <Entity  text={{text: "SHE'LL GO ALONE",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -30 0">
            <Entity  text={{text: "AND NEVER SPEAK",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -40 0">
            <Entity  text={{text: "OF THIS AGAIN",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity position="-35 70 -605" rotation="0 0 0" class="group_6">
          <Animation attribute="visible" to="false" dur="5000" begin="hide_group_6"/>
          <Entity position="0 0 0">
            <Entity  text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
          <Entity position="0 -10 0">
            <Entity  text={{text: "WE DEPEND ON YOU",height: 0.5, size: 5}} material={{color:'white'}} visible="false">
              <Animation attribute="visible" dur="400" to="true" begin="reveal"/>
            </Entity>
          </Entity>
        </Entity>
        <Entity collada-model="#terrain-asset-0" position="0 -10 -450" rotation="0 0 0"/>
        <Entity collada-model="#terrain-asset-1" position="0 -10 -550" rotation="0 0 0"/>
      </Entity>
    );
  }
}

class Part6 extends React.Component{
  render(){
    var primitives = ['box','cylinder', 'ring', 'sphere', 'torus', 'torusKnot', 'cone'];
    var shapes = [];
    var spread = 20;
    for (var i = 0;i< 6; i++){
      var x,y,z = 0;
      x = Math.floor(Math.random() * spread)+1;
      x *=Math.floor(Math.random()*2) == 1 ? 1 : -1;
      y = Math.floor(Math.random() * spread)+1;
      y *=Math.floor(Math.random()*2) == 1 ? 1 : -1;
      z = Math.floor(Math.random() * spread)+1;
      z *=Math.floor(Math.random()*2) == 1 ? 1 : -1;
      shapes.push(<Entity geometry={{primitive: primitives[Math.floor(Math.random() *7)]}} position={"" + x + " " + y + " " + z}>
        <Animation attribute="position" to="0 0 0" dur="180000" ease="linear" key ={i} />
      </Entity>);
    }
    return(
      <Entity id="part_6" visible="false" position="0 -5 -600">
        <Animation attribute="visible" to="false" begin="hide"/>
        <Animation attribute="visible" to="true" begin="show"/>
        {shapes}
      </Entity>
      );
  }
}

class Stars extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){
    return(
      <Entity entity-generator-primitive="mixin: starPrimitive; numElements: 200; spread: 500; minExclusion: 0;maxExclusion: 10;" >
        <Animation attribute='rotation' to='0 90 0' ease='ease-linear' repeat='indefinite' dur="60000" direction='alternate'/>
      </Entity>
      );
  }
}
class Hand extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity id="hand" collada-model="#hand-asset" scale="0.1 0.1 0.1" position="0 -1.4 -1.5" rotation="180 105 180" visible="false">
        <Animation attribute="position" from="0 -2.5 -1.5" to="0 -1.6 -1.5" dur="8000" ease="linear" begin="show_hand"/>
        <Animation attribute="visible" to="true" dur="8000" ease="linear" begin="show_hand"/>
        <Animation attribute="position" to="0 -1.6 -1.5" dur="10000" repeat="indefinite" direction="alternate" from="0 -1.4 -1.5" ease="linear" begin="start_movement"/>
        <Animation attribute="rotation" to ="180 270 90" from="180 105 180" direction="alternate" repeat="1" dur="15000" begin="rotate_hand" ease="linear"/>
      </Entity>
    );
  }
}

class Valley extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  constructor(props){
    super(props);
  }

  render(){
    return (<Entity id="valley" collada-model="#valley-asset" position="0 -5 -300" rotation="0 180 0" visible="false" />);
  }
}

class Fog extends React.Component{
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){

    return(
      <Entity material="fog:false" position="0 0 -1000">
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 20 0" material={{color: '#B38AAA', opacity: 0.2}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 60, depth: 2}} position="0 10 2" material={{color: '#673D68', opacity: 0.4}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 10 4" material={{color: '#A86B9F', opacity: 0.6}}/>
        <Entity geometry={{primitive: 'box', width: 800, height: 100, depth: 2}} position="0 0 6" material={{color: '#93639F', opacity: 0.8}}/>
      </Entity>
    );
  }
}

class Ending extends React.Component{
  render(){
    return(
      <Entity></Entity>
    );
  }
}

Array.prototype.newChainEvent = function(selector,emitEvent,delay){
    if (selector == '') return;
    var x = {};
    x.querySelector = selector;
    x.emitEvent = emitEvent;
    x.delay = delay;
    this.push(x);
    return this;
}

window.$ = $;
// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<PortRob/>, document.querySelector('.scene-container'));
