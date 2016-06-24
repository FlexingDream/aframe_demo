import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import ReactDOM from 'react-dom';
class RotatingSun extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let node = ReactDOM.findDOMNode(this.refs.rotatingSun);
      node.addEventListener('click',function(){
        node.querySelector('.camera').setAttribute('camera','active',true);
    });
  }


  render(){
    return(
    <Entity class='rotating-sun' ref="rotatingSun">
      {this.props.children}
      <Entity position={this.props.position}>
        <Camera wasd-controls={{enabled: false}}  position="0 100 0" >
          <Cursor/>
        </Camera>
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