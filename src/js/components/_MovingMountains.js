import {Animation, Entity} from 'aframe-react';
import MountainRange from './MountainRange';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import SequencedLasers from './SequencedLasers';
import MovingSpheres from './MovingSpheres';
import RotatingSun from './RotatingSun';
import RotatingMoon from './RotatingMoon';
class MovingMountains extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity position={this.props.position}>
        <Entity>
          <Camera id="camera" wasd-controls={{enabled: true}} active position="0 50 0" >
            <Cursor />
          </Camera>
          <Sky color="black"/>
        </Entity>
        <RotatingSun position="0 150 400"></RotatingSun>
        <RotatingMoon position="0 150 -300"></RotatingMoon>
        <Entity position="0 -600 0">
          <MountainRange position="0 0 0" scale="20 20 20"/>
          <MountainRange position="-800 0 -700" scale="20 20 20"/>
          <MountainRange position="-900 0 800" scale="20 20 20"/>
        </Entity>
        <Entity position="0 -100 0">
          <Entity>
            <Animation attribute="rotation" to="0 360 0 " dur="25000" direction="alternate" repeat="indefinite" easing="ease-in-out"/>
            <SequencedLasers position="15 0 0" margin="100"/>
            <SequencedLasers position="0 0 0" rotation="0 0 180" margin="100"/>
          </Entity>
          <Entity>
            <Animation attribute="rotation" to="0 -360 0 " dur="25000" direction="alternate" repeat="indefinite" easing="ease-in-out"/>
            <SequencedLasers position="45 0 0" margin="100" direction="-"/>
            <SequencedLasers position="-15 0 0" rotation="0 0 180" margin="100" direction="-"/>
          </Entity>
          <MovingSpheres position="0 100 50" margin="300"/>
        </Entity>
      </Entity>
    );
  }
}

MovingMountains.defaultProps = {
  position: "0 0 0"
};

export default MovingMountains;