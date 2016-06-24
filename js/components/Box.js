/**
  Box.js
  Creates a box.
*/

import {Entity} from 'aframe-react';


class Box extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity position={this.props.position}
              geometry={{
                primitive: 'box',
                width: this.props.width,
                height: this.props.height,
                depth: this.props.depth
              }}
      />
    );
  }
}

export default Box;
