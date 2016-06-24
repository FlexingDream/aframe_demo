import 'babel-polyfill';
import 'aframe-particle-system-component';

import $ from 'jquery';
import {Scene, Entity} from 'aframe-react';
import ReactDOM from 'react-dom';
import SkyToOcean from '../components/_SkyToOcean';
import Audio from '../components/Audio';
import Loading from '../components/_Loading';


class InsideOut extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stage: 0
    }
  }

  nextScene(){
    let currStage = this.state.stage;
    if (currStage == 0){
      var node = $(".audio-player").data("node");
      node.start(0);
    }
    let nextStage = currStage+1;
    let includeFog = false;
    this.setState({stage: nextStage,includeFog: includeFog});
  }

  getScene(){
    if (this.state.stage == 0)
      return <Loading nextScene={this.nextScene.bind(this)}/>;
    else
      return <SkyToOcean/>;
  }

  render(){
    return(
      <Scene stats fog id="scene">

        <a-assets>
          <Entity>
            <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
          </Entity>
          <Entity>
            {Loading.getModels()}
          </Entity>
        </a-assets>

        <Audio  audioSrc={'audio/inside_out.mp3'} shouldUpdateFrequencies="false" shouldPlay={true}/>
        {this.getScene()}

      </Scene>
    );
  }

}

window.$ = $;

ReactDOM.render(<InsideOut/>, document.querySelector('.scene-container'));
