import {Animation, Entity} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Helper from '../other/Helper';
import Text from '../components/Text';
import TextGroup from '../components/TextGroup';
class Loading extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let that = this;
    document.getElementById('scene').addEventListener('song_loaded',function(){
      setTimeout(function(){
        that.props.nextScene();

      },1000);
    });
  }

  static getMixins(){
  }

  render(){
    return(
      <Entity class='loading'>
        <Entity position={this.props.position}>
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
      </Entity>
    );
  }
}

Loading.defaultProps = {
  position: '0 0 0',
};



export default Loading;