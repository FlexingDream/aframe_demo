import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
class SequencedLasers extends React.Component{
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  getLasers(){
    let lasers = [];
    let startingX=0,startingY=0,startingZ=0;
    if (this.props.centerOn == 'x')
      startingX = (this.props.numLasers* this.props.width + this.props.numLasers*this.props.margin)/ 2 * -1;
    

    for (let i =0;i<this.props.numLasers;i++){
      let position = ""+(startingX+(i*this.props.margin))+" " + startingY+" " +startingZ;
      let endAnimPosition = position.split(' ');
      let endAnimRotation = [0,0,0];
      if (this.props.direction == '+'){
        endAnimPosition[2] = parseInt(endAnimPosition[2])+1000;
        endAnimRotation = [90,90,90];
      }
      else {
        endAnimPosition[2] = parseInt(endAnimPosition[2])-1000;
        endAnimRotation = [-90,-90,-90];
      }
      lasers.push(
        <Entity geometry={{primitive: 'box',height: this.props.height, depth: this.props.depth, width: this.props.width}} 
        material={{color: Helper.getRandomColor()}}
        position={position}
        >
          <Animation attribute="position" to={endAnimPosition} dur="15000" direction="alternate" repeat="indefinite" easing="ease-in-out" begin={i*300}/>
          <Animation attribute="rotation" to={endAnimRotation} dur="15000" direction="alternate" repeat="indefinite" easing="ease-in-out" begin={i*600}/>
        </Entity>
      );
    }
    return lasers;
  }

  render(){
    let elements = this.getLasers();
    return(
      <Entity position={this.props.position} rotation={this.props.rotation}>
        {elements}
      </Entity>
    );
  }
}

SequencedLasers.defaultProps = {
  position: "0 0 0",
  numLasers: 10,
  width: 10,
  depth: 200,
  height: 10,
  centerOn: 'x',
  margin: 20,
  rotation: "0 0 0",
  direction: '+'
};

export default SequencedLasers;