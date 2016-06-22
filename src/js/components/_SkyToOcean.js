/**
  _SkyToOcean
  Falling from sky to ocean. Mainly for InsideOut.
*/
import {Entity,Animation} from 'aframe-react';
import WalkableCameraCursor from './WalkableCameraCursor';
import Sky from './Sky';
import Ocean from './Ocean';
import Rain from './Rain';

class SkyToOcean extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity>
        <Rain position={[0, 500, 0]}/>

        <Entity>
          <WalkableCameraCursor position={[0, 500, 0]}/>
        </Entity>

        <Entity
          geometry={{primitive: 'sphere', radius: 0.5}}
          material={{color: 'blue', shader: 'flat'}}
          position={[0, 0, -2]}/>

        <Ocean/>

        <Sky color="black"/>

      </Entity>
    );

  }
}

export default SkyToOcean;
