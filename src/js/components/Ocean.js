/**
  Ocean.js
  Creates an ocean with waves.
  IMPORTANT - Ocean needs to be registered
*/
import extras from 'aframe-extras';
import Helper from '../other/Helper';

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
      <a-ocean position={this.props.position || "0 -1 0"}></a-ocean>
    );
  }

}

export default Ocean;
