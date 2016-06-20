import {Animation, Entity} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import RotatingSun from './RotatingSun';
import RotatingMoon from './RotatingMoon';
import Helper from '../other/Helper';
import ColladaModel from '../components/ColladaModel';
import Rings from '../components/Rings';
import RandomStars from '../components/RandomStars';
import Planet from '../components/Planet';
class Space extends React.Component{
  constructor(props){
    super(props);
  }

  static getModels(){
    return[
      <a-asset-item id="sun-collada" src={Helper.MODEL_LOCATION+"sun.dae"}></a-asset-item>,
      <a-asset-item id="moon-collada" src={Helper.MODEL_LOCATION+"moon-2.dae"}></a-asset-item>,
      <a-asset-item id="neptune-collada" src={Helper.MODEL_LOCATION+"neptune.dae"}></a-asset-item>,
      <a-asset-item id="saturn-collada" src={Helper.MODEL_LOCATION+"saturn.dae"}></a-asset-item>,
      <a-asset-item id="star-collada" src={Helper.MODEL_LOCATION+"star.dae"}></a-asset-item>,
      <a-asset-item id="rocket-collada" src={Helper.MODEL_LOCATION+"rocket.dae"}></a-asset-item>,
      <a-asset-item id="rocket-flames-collada" src={Helper.MODEL_LOCATION+"rocket_flames.dae"}></a-asset-item>,
    ];
  }

  render(){
    return(
      <Entity position={this.props.position}>
        <Entity>
          <Camera id="camera" wasd-controls={{enabled: true}} active position="0 50 0" >
            <Cursor />
          </Camera>
          <Sky color="black"/>
        </Entity>
        <RotatingSun position="0 0 0"></RotatingSun>
        <RotatingMoon position="0 150 -300" rotation="0 0 0">
          <Animation attribute="rotation" to="0 360 0" from="0 0 0" dur="60000" repeat="indefinite"  ease="linear"/>
        </RotatingMoon>
        <Rings />
        <RandomStars />
        <Planet asset="#neptune-collada" position="100 100 100">
          <Animation attribute="rotation" to="0 360 0" ease="linear" dur="60000" repeat="indefinite" />
        </Planet>
        <Planet asset="#saturn-collada" position="-300 100 -300">
          <Animation attribute="rotation" to="0 360 0" ease="linear" dur="90000" repeat="indefinite" />
        </Planet>
        <ColladaModel asset="#rocket-collada" position="-200 -200 -200" scale="0.5 0.5 0.5" rotation="45 0 0">
          <Animation attribute="position" to="300 300 300" dur="60000" ease="linear"/>
          <ColladaModel asset="#rocket-flames-collada" position="0 0 0" scale="1 1 1">
            <Animation attribute="rotation" to="0 360 0" ease="linear" dur="200" repeat="indefinite" from="0 0 0" />
          </ColladaModel>

        </ColladaModel>
      </Entity>
    );
  }
}


Space.defaultProps = {
  position: "0 0 0"
};

export default Space;