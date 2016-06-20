import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';

class MovingSpheres extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let spheres = [];
    let startPosition = this.props.position.split(' ');
    let startY = parseInt(startPosition[1]);
    let margin = parseInt(this.props.margin);
    for (let i =0;i < this.props.numSpheres; i++){
      let radius = Helper.getRandWithMargin(20);
      let startPosition = [Helper.getRandWithMargin(margin),startY,Helper.getRandWithMargin(margin)];
      let endPosition = startPosition.slice(0);
      endPosition[2] = startPosition[2] * - 1;
      endPosition[0] = startPosition[0] * -1;
      console.log(startPosition,endPosition);
      spheres.push(
        <Entity geometry={{primitive: 'sphere', radius:radius}} material={{color: 'red'}} position={startPosition} >
          <Animation attribute="position" to={endPosition} dur="25000" direction="alternate" repeat="indefinite" easing="ease-in-out"/>
        </Entity>
      );
    }


    return(
      <Entity>
        {spheres}
      </Entity>
    );
  }
}
MovingSpheres.defaultProps = {
  numSpheres : 8,
  position: "0 0 0",
  margin: 25
}
export default MovingSpheres;