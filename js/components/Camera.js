import {Entity} from 'aframe-react';
import React from 'react';


class Camera extends React.Component{
  constructor(props){
    super(props);
  }

  static getCameraPosition(){
    var elem = document.getElementsByClassName("camera")[0];
    var position = elem.getAttribute('position');
    return (position);
  }
  render(){
    return (<Entity><Entity class="camera" camera="" look-controls="" wasd-controls="" position={[0,0,5]} {...this.props}/></Entity>);
  }
};



export default Camera;
