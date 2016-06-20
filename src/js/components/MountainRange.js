import {Animation, Entity, Scene} from 'aframe-react';
import ColladaModel from './ColladaModel';
import SequencedLasers from './SequencedLasers';
class MountainRange extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let origPos = this.props.position;
    let x = parseInt(origPos.split(' ')[0]) * -1;
    let y = parseInt(origPos.split(' ')[1]);
    let z = parseInt(origPos.split(' ')[2]) *-1;
    let endAnimPosition = "" + (x+ " " + y + " " + z);
    return(
        <Entity position={this.props.position} rotation={this.props.rotation} scale={this.props.scale}>
          <Animation attribute="position" to={endAnimPosition} dur="10000" direction="alternate" repeat="indefinte" ease="linear"/>
          <ColladaModel asset="#mountains-1-collada"/>
          <ColladaModel asset="#mountains-2-collada"/>
          <ColladaModel asset="#mountains-3-collada"/>
          <ColladaModel asset="#mountains-4-collada"/>
        </Entity>
    );
  }
}
MountainRange.defaultProps = {
  position: "0 0 0",
  rotation: "0 0 180",
  scale: "5 5 5"
};

export default MountainRange;