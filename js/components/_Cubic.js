import {Entity,Animation} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import Helper from '../other/Helper';
import CubicSnake from '../components/CubicSnake';
import CubicWalkway from '../components/CubicWalkway';
import CubicRainbow from '../components/CubicRainbow';
class Cubic extends React.Component{
  constructor(props){
    super(props);
  }

  static getModels(){
    return[
    ];
  }

  render(){
    return(
      <Entity position={this.props.position}>
        <Entity>
          <Camera id="camera" wasd-controls={{enabled: true}} active position="0 5 0" >
            <Animation attribute='position' to='0 5 200' dur='30000' ease='linear' begin='5000' /> 
            <Cursor />
          </Camera>
          <Sky color='black'/>
        </Entity>
        <CubicWalkway position="0 0 -4"/>
        {CubicWalkway.getRandomWalkways(5)}

        {CubicSnake.getRandomSnakes(10)}
        <CubicRainbow position="0 0 30" rotation="90 0 0"/>
      </Entity>

    );
  }


}

Cubic.defaultProps = {
  position: "0 0 0",
};

export default Cubic;