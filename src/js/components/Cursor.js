import {Animation, Entity} from 'aframe-react';
import React from 'react';
import 'aframe_components/raycaster-helper';
import 'aframe_components/cursor-interaction';
class Cursor extends React.Component{
  constructor(props){super(props);}
  render(){
    return (
      <Entity cursor={this.props.cursor}  geometry={this.props.geometry} material={this.props.material} position="0 0 -1">
        <a-animation begin="click" easing="ease-in" attribute="scale" fill="backwards" from="0.1 0.1 0.1" to="1 1 1" dur="300"></a-animation>
          <a-animation begin="fusing" easing="ease-in" attribute="scale" fill="forwards" from="1 1 1" to="0.1 0.1 0.1" dur="300"></a-animation>
      </Entity>
    );
  }
}
Cursor.defaultProps = {
  geometry: {
    primitive: 'ring',
    radiusInner: 0.01,
    radiusOuter: 0.014
    // radius: 0.5,
    // height: 1
  },
  material: {
    color: 'white',
    shader: 'flat',
    opacity:  0.9,
    transparent: true
  },
  cursor:{
    fuse: true,
    timeout: 1,
    maxDistance: 100000,
  }
}
export default Cursor;
