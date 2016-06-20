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
    <Entity>
      {this.props.children}
      <Entity position={this.props.position}>
        <ColladaModel asset="#sun-collada" >
          <Animation attribute="rotation" to="0 360 0 " from ="0 0 0" dur="30000" direction="forward" repeat="indefinite" easing="linear"/>
        </ColladaModel>
      </Entity>
    </Entity>
    );
  }
}

RotatingSun.defaultProps = {
  position: "100 100 100",
}
export default RotatingSun;