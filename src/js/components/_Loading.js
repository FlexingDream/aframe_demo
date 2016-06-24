import {Animation, Entity} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Helper from '../other/Helper';
import Text from '../components/Text';
import TextGroup from '../components/TextGroup';
import ColladaModel from '../components/ColladaModel';
import Sky from '../components/Sky';
import ReactDOM from 'react-dom';
class Loading extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let that = this;
    document.querySelector('#ready-btn').addEventListener('click',function(){
        that.props.nextScene();
    });

    document.getElementById('scene').addEventListener('song_loaded',function(){
      setTimeout(function(){
        ReactDOM.findDOMNode(that.refs.readyBtn).emit('show');
        ReactDOM.findDOMNode(that.refs.loading).emit('hide');

      },1000);
    });
  }
  static getModels(){
    return[
      <a-asset-item id="ready-btn-collada" src={Helper.MODEL_LOCATION+"readybtn.dae"}></a-asset-item>
    ];
  }

  static getMixins(){
  }

  render(){
    return(
      <Entity class='loading'>
        <Entity position={this.props.position}>
          <Entity>
            <Camera ref='camera' id="camera" wasd-controls={{enabled: false}} active position="0 0 10" >
              <Cursor cursor="timeout: 1; fuse: true; maxDistance: 100000;"/>
            </Camera>
            <Sky color='black'/>
          </Entity>
          <Entity ref='loading'>
            <Animation attribute='visible' to='false' begin='hide'/>
            <TextGroup>
            <Text text='LOADING' size={1}/>
            <Text text="." size={1}>
              <Animation attribute='scale' to='1.2 1.2 1.2 ' from='0.8 0.8 0.8' direction='alternate' begin='0' fill='forwards' repeat='indefinite' dur='3000'/>
            </Text>
            <Text text="." size={1}>
              <Animation attribute='scale' to='1.2 1.2 1.2 ' from='0.8 0.8 0.8' direction='alternate' begin='0' fill='forwards' repeat='indefinite' dur='3000'/>
            </Text>
            <Text text="." size={1}>
              <Animation attribute='scale' to='1.2 1.2 1.2 ' from='0.8 0.8 0.8' direction='alternate' begin='0' fill='forwards' repeat='indefinite' dur='3000'/>
            </Text>
            </TextGroup>
          </Entity>
          <ColladaModel id='ready-btn' ref='readyBtn' asset='#ready-btn-collada' position='-5 3 -10' scale='0.6 0.6 0.6' visible='false'>
            <Animation attribute='visible' to='true' begin='show'/>
          </ColladaModel>
        </Entity>
      </Entity>
    );
  }
}

Loading.defaultProps = {
  position: '0 0 0',
};



export default Loading;