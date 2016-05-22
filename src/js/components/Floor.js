import {Entity} from 'aframe-react';
import React from 'react';
class Floor extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(<Entity geometry={{primitive: 'plane', width:5000, height: 5000}} rotation={[-90, 0, 0]} position={[0,0,0]} material={{color:this.props.color, shader: 'flat'}} />);
  }
};

export default Floor;