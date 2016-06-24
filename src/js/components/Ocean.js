/**
  Ocean.js
  Creates an ocean with waves.
  IMPORTANT - Ocean needs to be registered
*/
import {Entity, Animation} from 'aframe-react';
import extras from 'aframe-extras';
import Helper from '../other/Helper';
import Box from './Box';
import Dust from './Dust';

class Ocean extends React.Component{

  constructor(props){
    super(props);
  }

  /**
    #componentWillMount
    Registers Ocean component
  */
  componentWillMount(){
    extras.registerAll();
  }

  render(){
    return(
      <Entity>
        <a-ocean position={this.props.position || "0 -1 0"}></a-ocean>
        <a-box color="#12308D" position="0 -5 0" depth="50000" height="1" width="50000">
          <Animation attribute="visible" begin="23000" to="false"/>
        </a-box>
        <Dust position={[0, -50, 0]} />
      </Entity>
    );
  }

}

export default Ocean;
