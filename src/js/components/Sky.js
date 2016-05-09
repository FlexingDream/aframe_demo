import {Entity} from 'aframe-react';
import React from 'react';

class Sky extends React.Component{

  // TODO: Set default properties
  constructor(props){
    super(props);

  }
  render(){
    return(<Entity geometry={{primitive: 'box',height: 5000,width:5000,depth:5000, radius: 5000}}
          material={{color: this.props.color, shader: 'flat'}}
          scale="1 1 -1"
           />
          );
  }
};
export default Sky;
