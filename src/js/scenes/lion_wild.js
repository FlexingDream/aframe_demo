import {Animation, Entity, Scene} from 'aframe-react';
import 'aframe-layout-component';
import ReactDOM from 'react-dom';

import Perf from 'react-addons-perf';
import 'babel-polyfill';
import $ from 'jquery';
import Audio from '../components/Audio';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Helper from '../other/Helper';
import ColladaModel from '../components/ColladaModel';
import MovingMountains from '../components/_MovingMountains';
var MODEL_LOCATION = "3d_models/";

class LionWild extends React.Component{
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      shouldPlay: true,
      stage: 0,
    }
  }
  shouldComponentUpdate(nextProps,nextState){
  }
  getMixins(){
    return(
      <Entity/>
    );
  }
  getModels(){
    return(
      <Entity>
        <a-asset-item id="mountains-1-collada" src={MODEL_LOCATION+"mountains_1.dae"}></a-asset-item>
        <a-asset-item id="mountains-2-collada" src={MODEL_LOCATION+"mountains_2.dae"}></a-asset-item>
        <a-asset-item id="mountains-3-collada" src={MODEL_LOCATION+"mountains_3.dae"}></a-asset-item>
        <a-asset-item id="mountains-4-collada" src={MODEL_LOCATION+"mountains_4.dae"}></a-asset-item>
        <a-asset-item id="sun-collada" src={MODEL_LOCATION+"sun.dae"}></a-asset-item>
        <a-asset-item id="moon-collada" src={MODEL_LOCATION+"moon-2.dae"}></a-asset-item>
      </Entity>
    );
  }
  getAssets(){
    return(
      <a-assets>
        {this.getMixins()}
        {this.getModels()}
      </a-assets>
      );
  }
  componentDidMount(){
    Helper.showTimer();
  }

  render(){
    return(
      <Scene stats fog id="scene">
        {this.getAssets()}
        <Audio  audioSrc={this.props.song} shouldUpdateFrequencies="false" shouldPlay={this.state.shouldPlay}/>
        <MovingMountains/>

      </Scene>
    );
  }
}
LionWild.defaultProps = {
  song: 'audio/lion_wild.mp3',
};

window.$ = $;

// ONLY FOR DEV MODE OTHERWISE WONT WORK
window.Perf = Perf;

ReactDOM.render(<LionWild/>, document.querySelector('.scene-container'));
