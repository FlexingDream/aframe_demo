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
import Space from '../components/_Space';

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
        {MovingMountains.getModels()}
        {Space.getModels()}
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
      <Scene stats id="scene">
        {this.getAssets()}
        <Audio  audioSrc={this.props.song} shouldUpdateFrequencies="false" shouldPlay={this.state.shouldPlay}/>
        {/*<MovingMountains/>*/}
        <Space/>
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
