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
    <Entity >
      {this.props.children}
      <Entity position={this.props.position} >
        <ColladaModel asset="#moon-collada" >
          <a-entity light="type: hemisphere; color: #ffff; groundColor:  #000; intensity: 2"></a-entity>
          {/*<Animation attribute="rotation" to="0 360 0 " from ="0 0 0" dur="30000" direction="forward" repeat="indefinite" easing="linear"/>*/}
        </ColladaModel>
      </Entity>
    </Entity>
    );
  }
}
RotatingMoon.defaultProps = {
  position: "100 100 100",
}

export default RotatingMoon;