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

class Scene5 extends React.Component{
  constructor(props){
    super(props);
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
      <a-asset-item id="room" src="../3d_models/room.dae"></a-asset-item>
      <a-asset-item id="room-obj" src="../3d_models/room.obj"></a-asset-item>
      <a-asset-item id="saturn" src="../3d_models/saturn.dae"></a-asset-item>
      <a-asset-item id="test" src="../3d_models/json_formatted/test.js"></a-asset-item>
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
    <Scene stats fog={{type: 'linear', far: 200}}>
      {this.getAssets()}
      <Camera position={[0,1,0]} wasd-controls={{enabled: true}}>
        <Cursor />
        {/*<Animation attribute="position" to="1000 1 0" dur="40000" ease="ease-in-out" />*/}
      </Camera>
        <Sky color='#1D2327'/>
      
{/*      <Entity collada-model='#room' position="20 -25 -12" />
      <Entity geometry={{primitive: 'sphere', radius: 10}} material={{color: 'yellow'}} position="50 50 50">*/}
      <Entity 
                position="20 -25 -12"
                three-model={{loader: 'json',
                             animation: 'default',
                             src: "#test"}}>
      </Entity>
      <Rings/>
    </Scene>);
  }

}

class Rings extends React.Component{
  randomColor(){
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    var rings = [];
    for (var i =0;i < 20; i++){
      rings.push(
        <Entity geometry={{primitive:'torus', radius: 40, radiusTubular: 2}} material={{color: this.randomColor()}} rotation="0 90 0" id={i} >
        </Entity>)
    }
    return(<Entity layout={{type: 'line', margin: 50}} position="30 1 0" rotation="90 0 0">{rings}</Entity>);
  }
}

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;
ReactDOM.render(<Scene5/>, document.querySelector('.scene-container'));

