import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
class Planet extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity>
        {this.props.children}
        <Entity position={this.props.position}>
          <ColladaModel asset={this.props.asset} scale={this.props.scale}>
            {/*<Animation attribute="rotation" to="0 360 0" ease="linear" dur="30000" repeat="indefinite" />*/}
          </ColladaModel>

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