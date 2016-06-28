import {Animation, Entity} from 'aframe-react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'babel-polyfill';
import Scene from '../components/Scene';
import Audio from '../components/Audio';
import Helper from '../other/Helper';
import MovingMountains from '../components/_MovingMountains';
import Space from '../components/_Space';
import Cubic from '../components/_Cubic';
import Loading from '../components/_Loading';
import SkyToOcean from '../components/_SkyToOcean';
import Ending from '../components/_Ending';
import 'aframe-particle-system-component';
import '../aframe_components/mobile-touch-interaction';
class LionWild extends React.Component{
  constructor(props){
    super(props);
    var heights = Array.apply(null,Array(this.props.frequencySize)).map(function(x,i){return 0});
    this.state = {
      heights: heights,
      shouldPlay: true,
      stage: 0,
      includeFog: false,
    }
  }
  getMixins(){
    return(
      <Entity>
        {Cubic.getMixins()},
        <a-mixin id="laser" geometry="primitive: box; depth: 0.5; width: 0.5;" material="opacity:0.3;shader:flat;"></a-mixin>
      </Entity>
    );
  }
  getModels(){
    return(
      <Entity>
        {Loading.getModels()}
        {MovingMountains.getModels()}
        {Space.getModels()}
        {Cubic.getModels()}
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
    let that = this;
/*    document.querySelector('.audio-player').addEventListener('ended',function(){
      console.log('finished song');
      that.nextScene();
    });*/

    document.addEventListener('touchstart', () => {
      document.querySelector('#ready-btn').emit('ios-click');
    })

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
    else if (this.state.stage == 1)
      return <Cubic nextScene={this.nextScene.bind(this)}/>;
    else if (this.state.stage == 2)
      return <Space nextScene={this.nextScene.bind(this)}/>;
    else if (this.state.stage == 3)
      return <SkyToOcean/>;
  }

  render(){
    return(
      <Scene id="scene" includeFog={this.state.includeFog}>
        {this.getAssets()}
        <Audio  audioSrc={this.props.song} shouldUpdateFrequencies="false" shouldPlay={this.state.shouldPlay}/>
        {this.getScene()}
      </Scene>
    );
  }
}
LionWild.defaultProps = {
  song: 'audio/lion_wild.mp3',
};

window.$ = $;

ReactDOM.render(<LionWild/>, document.querySelector('.scene-container'));
