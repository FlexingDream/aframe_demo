import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
import ReactDOM from 'react-dom';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
class Planet extends React.Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    let node = ReactDOM.findDOMNode(this.refs.planet);
      node.addEventListener('click',function(){
        console.log(node.querySelector('.camera'));
        node.querySelector('.camera').setAttribute('camera','active',true);
    });
  }
  getAnimations(){
    return[
    <Animation attribute="rotation" to="0 360 0" ease="linear" dur="30000" repeat="indefinite" />,
    <Animation attribute="scale" to={Helper.getRandArrayWithMargin(3,true)} from='1 1 1' ease="linear" dur="5000" repeat="1" direction="alternate" fill='both' begin='click'/>,
    <Animation attribute="rotation" to={Helper.getRandArrayWithMargin(360,true)} ease="linear" dur="12000" repeat="1" direction="alternate" fill='both' begin='click'/>
    ]
  }

  getContent(){
    if (this.props.asset!=''){
      return(
        <ColladaModel asset={this.props.asset} scale={this.props.scale}>
          {this.getAnimations()}
        </ColladaModel>
      );
    }
    else{
      return(
        <Entity geometry={{primitive: 'sphere', radius: Helper.getRandWithMargin(100,true)}} position={Helper.getRandArrayWithMargin(600,false)} rotation={Helper.getRandArrayWithMargin(360,true)} material={{shader: 'standard', color: Helper.getRandomColor(), metalness: 0.8, roughness: 1}}>
        </Entity>
      );
    }
  }

  render(){
    return(
      <Entity class="planet">
        {this.props.children}

        <Entity position={this.props.position} ref="planet">
          <Camera wasd-controls={{enabled: false}}  position="0 50 0" >
            <Cursor/>
          </Camera>
          {this.getContent()}
        </Entity>
      </Entity>
    );
  }
}
Planet.defaultProps = {
  position: "0 0 0",
  asset: '',
  scale: "1 1 1",
};

export default Planet;