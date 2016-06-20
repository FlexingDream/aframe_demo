import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';

class RotatingSun extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
    <Entity position={this.props.position}>
      {this.props.children}
      <ColladaModel asset="#sun-collada" >
        <Animation attribute="rotation" to="0 360 0 " from ="0 0 0" dur="15000" direction="forward" repeat="indefinite" easing="ease-in-out"/>
      </ColladaModel>
    </Entity>
    );
  }
}

RotatingSun.defaultProps = {
  position: "100 100 100",
}
export default RotatingSun;