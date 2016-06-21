import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import 'aframe-layout-component';
class CubicRainbow extends React.Component{
  constructor(props){
    super(props);
  }

  getRainbow(){
    let rainbow = [];
    for (let i =0,count = 0;i < 8; i++){
      let position = [0,0,0];
      position[1] = count;
      position[0] = i;
      rainbow.push(
        <Entity geometry={{primitive: 'box', width: 4, height: 4, depth: 2}}>

        </Entity>
      );
      if (count == 3) count--;
      else if (count == 0)count++;
    }
    return rainbow;
  }

  render(){
    return(
      <Entity>
        {this.props.children}
        <Entity position={this.props.position} layout={{type: 'circle', radius: 10}}>
          {this.getRainbow()}
        </Entity>

      </Entity>
    );
  }
}

CubicRainbow.defaultProps = {
  position: '0 0 0',
};

export default CubicRainbow;