import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import 'aframe-layout-component';
class CubicRainbow extends React.Component{
  constructor(props){
    super(props);
  }
  static getRandomRainbows(numRainbows){
    let rainbows = [];
    for (let i =0;i<numRainbows; i++){
      let position = Helper.getRandArrayWithMargin(300);
      rainbows.push(
        <CubicRainbow position={position}>
        </CubicRainbow>
      );
    }
    return rainbows;
  }

  getRainbow(){
    let rainbow = [];
    let origPosition = this.props.position.split(' ');
    for (let i =0,count = 0;i < this.props.numBlocks; i++){
      let rad = i * (2 * Math.PI) / this.props.numBlocks ;
      let position = [0,0,0];
      position[0] = parseInt(origPosition[0]) + this.props.radius * Math.cos(rad);
      position[2] = parseInt(origPosition[2]);
      position[1] = parseInt(origPosition[1]) + this.props.radius * Math.sin(rad);
      rainbow.push(
        <Entity geometry={{primitive: 'box', width: this.props.width, height: this.props.height, depth: this.props.depth}} position={position}>
        </Entity>
      );
    }
    return rainbow;
  }

  render(){
    return(
      <Entity rotation={this.props.rotation}>
        {this.props.children}
        <Entity position={this.props.position} >
          {this.getRainbow()}
        </Entity>

      </Entity>
    );
  }
}

CubicRainbow.defaultProps = {
  position: '0 0 0',
  rotation: '0 0 0',
  numBlocks: 10,
  radius: 16,
  height: 4,
  width: 4,
  depth: 2,
};

export default CubicRainbow;