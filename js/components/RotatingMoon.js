import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import ReactDOM from 'react-dom';
class RotatingMoon extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let node = ReactDOM.findDOMNode(this.refs.rotatingMoon);
      node.addEventListener('click',function(){
        console.log(node.querySelector('.camera'));
        node.querySelector('.camera').setAttribute('camera','active',true);
    });
  }

  render(){
    return(
    <Entity ref='rotatingMoon' class="rotating-moon">
      {this.props.children}
      <Entity position={this.props.position} >
        <Camera wasd-controls={{enabled: false}}  position="0 50 0" >
          <Cursor/>
        </Camera>
        <ColladaModel asset="#moon-collada" >
          <a-entity light="type: hemisphere; color: #ffff; groundColor:  #000; intensity: 2"></a-entity>
          <Animation attribute="rotation" to="0 360 0 " from ="0 0 0" dur="30000" direction="forward" repeat="indefinite" easing="linear"/>
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