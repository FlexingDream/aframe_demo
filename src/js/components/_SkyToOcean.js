/**
  _SkyToOcean
  Falling from sky to ocean. Mainly for InsideOut.
*/
import 'aframe-layout-component';

import {Entity, Animation} from 'aframe-react';
import WalkableCameraCursor from './WalkableCameraCursor';
import Sky from './Sky';
import Ocean from './Ocean';
import Rain from './Rain';
import Box from './Box';
import SequencedLasers from './SequencedLasers';
import Lasers from './Laser';
import SchoolOfFishes from './SchoolOfFishes';
import HerdOfHorses from './HerdOfHorses';
import Butterflies from './Butterflies';
/**
<Entity
  geometry={{primitive: 'sphere', radius: 0.5}}
  material={{color: 'blue', shader: 'flat'}}
  position={[0, 0, -2]}/>


*/
class SkyToOcean extends React.Component{

  constructor(props){
    super(props);
  }
  /**
  <WalkableCameraCursor position={[0, 100, 0]}>
    <Animation attribute='position' to='0 -15 0' dur='30000' ease='linear' begin="2000"/>
  </WalkableCameraCursor>
  */
  render(){
    return(
      <Entity>
        <Rain position={[0, 500, 0]} maxAge="4">
        </Rain>

        <Entity>
          <WalkableCameraCursor position={[0, -15, 0]}>
          </WalkableCameraCursor>
        </Entity>

        <SequencedLasers position={[0, -80, 0]}/>
        <Lasers type='line' numBlocks="20" position="0 -100 0"/>

        <Ocean/>

        <SchoolOfFishes position={[500, -200, -2000]}>
          <Animation attribute='position' to={[-500, -200, 2000]} dur="50000"/>
        </SchoolOfFishes>

        <Entity layout={{
          type: 'circle',
          radius: 500
        }} position={[0, -100, 0]}>

          <Animation attribute='rotation' dur='20000' direction='reverse' to={[0, 360, 0]}/>
          <Animation attribute='position' dur='20000' to={[0, -100, 2000]} begin="20000"/>
          <HerdOfHorses rotation={[0, 0, 0]}>

          </HerdOfHorses>

        </Entity>

        <Butterflies position={[0, 0, -1000]}>
          <Animation attribute='position' dur='20000' to={[0, 0, 1000]}/>
          <Animation attribute='rotation' dur='20000' to={[0, 360, 360]} begin='20000'/>
          <Animation attribute='position' dur='20000' to={[0, 0, 2000]} begin='40000'/>

        </Butterflies>

        <Sky color="black"/>

      </Entity>
    );

  }
}

export default SkyToOcean;
