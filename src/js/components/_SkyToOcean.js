/**
  _SkyToOcean
  Falling from sky to ocean. Mainly for InsideOut.
*/
import {Entity, Animation} from 'aframe-react';
import WalkableCameraCursor from './WalkableCameraCursor';
import Sky from './Sky';
import Ocean from './Ocean';
import Rain from './Rain';
import Box from './Box';
import SequencedLasers from './SequencedLasers';
import Lasers from './Laser';

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

  render(){
    return(
      <Entity>
        <Rain position={[0, 500, 0]} maxAge="4">
        </Rain>

        <Entity>
          <WalkableCameraCursor position={[0, 100, 0]}>
            <Animation attribute='position' to='0 -15 0' dur='15000' ease='linear' begin="2000"/>
          </WalkableCameraCursor>
        </Entity>

        <SequencedLasers position={[0, -80, 0]}/>
        <Lasers type='line' numBlocks="20" position="0 -100 0"/>
        <Lasers type='circle' numBlocks="20" position="0 -50 0"/>

        <Ocean/>

        <Sky color="black"/>

      </Entity>
    );

  }
}

export default SkyToOcean;
