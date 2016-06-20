import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
class RotatingMoon extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
    <Entity position={this.props.position}>
      {this.props.children}
      <ColladaModel asset="#moon-collada" >
        <a-entity light="type: hemisphere; color: #ffff; groundColor:  #000; intensity: 2"></a-entity>
        <Animation attribute="rotation" to="0 360 0 " from ="0 0 0" dur="15000" direction="forward" repeat="indefinite" easing="ease-in-out"/>
      </ColladaModel>
    </Entity>
    );
  }
}
RotatingMoon.defaultProps = {
  position: "100 100 100",
}

export default RotatingMoon;