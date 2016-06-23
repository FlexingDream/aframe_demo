import {Entity,Animation} from 'aframe-react';
import Camera from '../components/Camera';
import Cursor from '../components/Cursor';
import Sky from '../components/Sky';
import Helper from '../other/Helper';
import CubicSnake from '../components/CubicSnake';
import CubicWalkway from '../components/CubicWalkway';
import CubicRainbow from '../components/CubicRainbow';
import CubicFoldable from '../components/CubicFoldable';
import RandomCubes from '../components/RandomCubes';
class Cubic extends React.Component{
  constructor(props){
    super(props);
  }

  static getMixins(){
    return[
      CubicFoldable.getMixins(),
    ];
  }
  static getModels(){
    return[
    ];
  }

  render(){
    return(
      <Entity position={this.props.position}>
        <Entity>
          <Camera id="camera" wasd-controls={{enabled: true}} active position="0 5 0" >
            <Animation attribute='position' to='0 5 200' dur='40000' ease='linear' begin='5000' /> 
            <Cursor cursor="timeout: 1; fuse: true; maxDistance: 100000;"/>
          </Camera>
          <Sky color='green'/>
        </Entity>
        <CubicFoldable position="0 65 -40" numFolds={30} width={120}/>
        <CubicFoldable position="0 65 195" numFolds={30} width={120}/>
        <CubicFoldable position="10 5 40" numFolds={8} width={20} trigger={true} rotation="0 0 90"/>
        <CubicFoldable position="-10 5 40" numFolds={8} width={20} trigger={true} rotation="0 0 90" direction="-"/>
        <CubicWalkway position="0 0 -4"/>
        <CubicWalkway position="10 0 -4"/>
        <CubicWalkway position="-10 0 -4"/>
        <CubicRainbow position="0 0 0" height={3} width={4} depth={10}/>
        <CubicRainbow position="0 0 30" width={5} depth={6} height={2}>
          <Animation attribute="rotation" to="0 0 360" fill="both" repeat="indefinite" dur="20000" ease='linear'/>
        </CubicRainbow>
        <CubicRainbow position="0 0 60" depth={6} height={3} width={5}>
        </CubicRainbow> 
        <CubicRainbow position="0 0 90">
          <Animation attribute="rotation" to="0 0 -360" fill="both" repeat="indefinite" dur="30000" ease='linear'/>
        </CubicRainbow>
        <CubicRainbow position="0 0 120" height={6}/>
        <CubicRainbow position="0 0 150" width={8}>
          <Animation attribute="rotation" to="0 0 -720" fill="both" repeat="indefinite" dur="40000" ease='linear'/>
        </CubicRainbow>
        <RandomCubes numBlocks={200} position="0 0 50"/>

      </Entity>

    );
  }


}

Cubic.defaultProps = {
  position: "0 0 0",
};

export default Cubic;