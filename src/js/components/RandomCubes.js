import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import 'aframe-layout-component';
import ReactDOM from 'react-dom';
class RandomCubes extends React.Component{
  constructor(props){
    super(props);
  }
  getRandomCubes(){
    let blocks = [];
    for (let i =0;i<this.props.numBlocks;i++){
      let position = Helper.getRandArrayWithMargin(400);
      let width = Helper.getRandWithMargin(8);
      let height = Helper.getRandWithMargin(8);
      let depth = Helper.getRandWithMargin(8);
      let endPosition = Helper.getRandArrayWithMargin(600);
      let rotation = Helper.getRandArrayWithMargin(360);
      blocks.push(
        <Entity geometry={{primitive: 'box',width: width, height: height, depth: depth}} position={position} rotation={rotation}>
          <Animation begin="click" to={endPosition} from={position} dur="5000" ease="linear" fill="forwards" attribute="position"/>
        </Entity>
      );
    }
    return blocks;
  }

  render(){
    return(
      <Entity>
        {this.props.children}
        <Entity position={this.props.position}>
          {this.getRandomCubes()}
        </Entity>
      </Entity> 
    );
  }
}

RandomCubes.defaultProps = {
  position: "0 0 0",
  numBlocks: 50,
};

export default RandomCubes;