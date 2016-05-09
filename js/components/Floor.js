import {Entity} from 'aframe-react';
import React from 'react';
class Floor extends React.Component{

  render(){
    return(<Entity geometry={{primitive: 'plane', width:200, height: 200}} rotation={[-90, 0, 0]} position={[-1,-10,-1]} material={{color:'blue', shader: 'flat'}} cursor-listener class="lookable"/>);
  }
};

export default Floor;