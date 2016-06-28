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
import Eagle from './Eagle';
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


  <WalkableCameraCursor position={[0, 100, 0]}>
    <Animation attribute='position' to='0 -15 0' dur='30000' ease='linear' begin="2000"/>
  </WalkableCameraCursor>

  */
  render(){
    return(
      <Entity>
        <Rain position={[0, 500, 0]} maxAge="4">
        </Rain>

        <Entity rotation={[0, 180, 0]}>
          <WalkableCameraCursor position={[0, 100, 0]}>
            <Animation attribute='position' to='0 -15 0' dur='30000' ease='linear' begin="2000"/>
          </WalkableCameraCursor>
        </Entity>


        <Eagle position={[150, 15, -1000]}>
          <Animation attribute='position' to={[150, 15, 100]} dur='5000'/>
          <Animation attribute='position' from={[150, 15, 100]} to={[-1000, 5, 500]} dur='20000' begin='5000'/>
          <Animation attribute='visible' to='false' begin='25000'/>
        </Eagle>

        <SequencedLasers visible='false' position={[0, -80, 0]}>
          <Animation attribute='visible' to='true' begin='100000'/>
        </SequencedLasers>

        <Lasers type='line' visible='false' numBlocks="20" position="0 -100 0">
          <Animation attribute='visible' to='true' begin='80000'/>
        </Lasers>

        <Ocean/>

        <SchoolOfFishes visible='false' position={[500, -200, -1000]}>
          <Animation attribute='visible' to='true' begin='8000'/>
          <Animation attribute='position' to={[-500, -200, 2000]} dur="50000" begin='8000'/>
        </SchoolOfFishes>

        <Entity layout={{
          type: 'circle',
          radius: 300
        }} position={[0, -100, -1000]} visible='false'>
          <Animation attribute='visible' to='true' begin='25000'/>
          <Animation attribute='position' to={[0, -100, 1000]} dur='20000' begin='25000'/>
          <Animation attribute='rotation' dur='20000' direction='reverse' to={[0, 360, 0]} begin='45000'/>
          <Animation attribute='position' dur='20000' from={[0, -100, 1000]} to={[0, -100, 2000]} begin="65000"/>
          <HerdOfHorses rotation={[0, 0, 0]}>

          </HerdOfHorses>

        </Entity>

        <Butterflies position={[0, 0, -1000]}>
          <Animation attribute='position' dur='10000' to={[0, 0, 1000]} begin='25000'/>
          <Animation attribute='rotation' dur='20000' repeat="indefinite" to={[0, 0, 360]} begin='45000'/>
        </Butterflies>


        <Sky color="black"/>

      </Entity>
    );

  }
}

export default SkyToOcean;
