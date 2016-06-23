import 'babel-polyfill';
import 'aframe-particle-system-component';

import $ from 'jquery';
import {Scene, Entity} from 'aframe-react';
import ReactDOM from 'react-dom';
import SkyToOcean from '../components/_SkyToOcean';
import Audio from '../components/Audio';


class InsideOut extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    $(".audio-player").data("node").start();
  }
  render(){
    return(
      <Scene stats fog id="scene">
        <a-assets>
          <Entity>
            <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
          </Entity>
        </a-assets>
        <Audio  audioSrc={'audio/lion_wild.mp3'} shouldUpdateFrequencies="false" shouldPlay={true}/>
        <SkyToOcean/>


      </Scene>
    );
  }

}

window.$ = $;

ReactDOM.render(<InsideOut/>, document.querySelector('.scene-container'));
