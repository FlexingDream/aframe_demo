/**
  Rain.js
  Generates raindrops.
*/
import {Entity} from 'aframe-react';
import Helper from '../other/Helper';


class Rain extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity
        {...this.props}
        particle-system={{preset: 'rain', particleCount: "20000",  maxAge: this.props.maxAge || "6"}}
      >
      </Entity>
    );
  }
}

export default Rain;
