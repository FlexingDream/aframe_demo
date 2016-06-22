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
      <Entity particle-system={{preset: 'rain'}}
              {...this.props}
      />
    );
  }
}

export default Rain;
