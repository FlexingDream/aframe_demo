import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';

class Rings extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let rings = [];
    for (let i =0; i<this.props.numRings;i++){
      let radOut = (i+2) * 150;
      let radIn = radOut - 5;
      rings.push(
        <Entity geometry={{primitive: 'ring', radiusOuter: radOut, radiusInner: radIn}} position="0 -100 0" rotation="90 0 0" material={{color: 'white', side: 'back', opacity: 0.4, transparent: true}}/>
      );
    }
    return(
      <Entity>
        {rings}
      </Entity>
    );
  }
}
Rings.defaultProps = {
  numRings: 5,
}

export default Rings;