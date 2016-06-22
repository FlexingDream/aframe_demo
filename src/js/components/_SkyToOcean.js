/**
  _SkyToOcean
  Falling from sky to ocean. Mainly for InsideOut.
*/
import {Entity,Animation} from 'aframe-react';
import WalkableCameraCursor from './WalkableCameraCursor';
import Sky from './Sky';
import Ocean from './Ocean';

class SkyToOcean extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Entity>

        <Entity>
          <WalkableCameraCursor/>
          <Sky color="black"/>
        </Entity>

        <Entity
          geometry={{primitive: 'sphere', radius: 0.5}}
          material={{color: 'blue', shader: 'flat'}}
          position={[0, 0, -2]}/>

        <Ocean/>


      </Entity>
    );

  }
}

export default SkyToOcean;
