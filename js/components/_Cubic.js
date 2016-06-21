import {Entity,Animation} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import Helper from '../other/Helper';
import CubicSnake from '../components/CubicSnake';
import CubicWalkyway from '../components/CubicWalkway';
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
            <Cursor />
          </Camera>
        </Entity>
        <CubicWalkyway position="0 0 -4"/>
        <CubicWalkyway position="30 4 -4"/>
        <CubicWalkyway position="-35 -7 -4"/>

        {CubicSnake.getRandomSnakes(10)}
        <CubicRainbow position="0 0 -50"/>
      </Entity>

    );
  }


}

Cubic.defaultProps = {
  position: "0 0 0",
};

export default Cubic;