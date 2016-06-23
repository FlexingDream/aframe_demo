/**
  Dust.js
  Adds dust.
*/

import {Entity} from 'aframe-react';


class Dust extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity
        {...this.props}
        particle-system={{preset: 'dust', particleCount: "10000", maxAge: this.props.maxAge || "6"}}
      />
    );
  }
}

export default Dust;
