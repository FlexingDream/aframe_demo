import {Animation, Entity, Scene} from 'aframe-react';
import 'aframe';
import 'aframe-layout-component';
import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import '../aframe_components/entity-generator';
import '../aframe_components/Collider';
import '../aframe_components/intersect-color-change';
class Test extends React.Component{
  constructor(props){
    super(props);
  }
  getMixins(){
    return(
      <Entity>
        <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
        <a-mixin id="rain" geometry="primitive: box; depth: 0.2; width: 0.2; height: 2;" material="opacity: 0.1; shader:flat" intersect-color-change collider></a-mixin>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
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
      <a-assets>
        <a-mixin id="box" geometry="primitive: box; depth: 0.1, height: 0.3; width: 0.1"
                          material="color: #DDD; opacity: 0.4; shader: flat"
                          intersect-color-change></a-mixin>
        <a-mixin id="finger" geometry="primitive: box; height: 0.02; width: 0.02; depth: 0.5"
                             material="side: double"></a-mixin>
        <a-mixin id="raycaster" raycaster="objects: [mixin~='box']"
                                raycaster-helper material="opacity: 0.8"></a-mixin>

        <a-mixin id="color1" material="color: #0B88A8"></a-mixin>
        <a-mixin id="color2" material="color: #A6DC8C"></a-mixin>
        <a-mixin id="color3" material="color: #DFEB95"></a-mixin>
        <a-mixin id="color4" material="color: #095062"></a-mixin>
        <a-mixin id="color5" material="color: #FCEFED"></a-mixin>
        <a-mixin id="color6" material="color: #6173F4"></a-mixin>
        <a-mixin id="color7" material="color: #3B2E40"></a-mixin>
        <a-mixin id="color8" material="color: #F35E3E"></a-mixin>
      </a-assets>

      <a-entity geometry="primitive: plane; height: 50; width: 50"
                material="color: #E2F3F5; shader: flat"
                position="0 -1.8 0"
                rotation="-90 0 0"></a-entity>

      <a-entity camera look-controls wasd-controls>
        <a-entity id="left-hand" position="-0.5 -0.2 -0.5">
          <a-entity mixin="color1 finger" position=".1 0 0" rotation="10 20 0">
            <a-entity mixin="color1 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color2 finger" position=".2 0 0" rotation="10 10 0">
            <a-entity mixin="color2 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color3 finger" position=".3 0 0" rotation="10 0 0">
            <a-entity mixin="color3 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color4 finger" position=".4 0 0" rotation="10 -10 0">
            <a-entity mixin="color4 raycaster"></a-entity>
          </a-entity>
        </a-entity>

        <a-entity id="right-hand" position="0 -0.2 -0.5">
          <a-entity mixin="color5 finger" position=".1 0 0" rotation="10 10 0">
            <a-entity mixin="color5 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color6 finger" position=".2 0 0" rotation="10 0 0">
            <a-entity mixin="color6 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color7 finger" position=".3 0 0" rotation="10 -10 0">
            <a-entity mixin="color7 raycaster"></a-entity>
          </a-entity>
          <a-entity mixin="color8 finger" position=".4 0 0" rotation="10 -20 0">
            <a-entity mixin="color8 raycaster"></a-entity>
          </a-entity>
        </a-entity>
      </a-entity>

      <a-entity id="rain" position="0 10 0" entity-generator="mixin: box">
        <a-animation attribute="position" dur="16000" easing="linear" repeat="indefinite"
                     to="0 0 0"></a-animation>
      </a-entity>

      <a-sky color="#ECECEC" radius="50"></a-sky>
    </Scene>);
  }
}


window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK

ReactDOM.render(<Test/>, document.querySelector('.scene-container'));

