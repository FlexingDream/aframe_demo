/**
  WalkableCameraCursor.js
  Component for a Camera + Cursor combination.
*/
import {Animation} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';

class WalkableCameraCursor extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Camera id="camera" wasd-controls={{enabled: true}} active position={this.props.position || [0, 0, 0]}>
        {this.props.children}
      </Camera>
    );
  }
}
export default WalkableCameraCursor;
