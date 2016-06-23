import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import ReactDOM from 'react-dom';
class CubicWalkway extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let node = ReactDOM.findDOMNode(this.refs.walkway);
    for (let i =0;i<node.childNodes.length;i++){
      ReactDOM.findDOMNode(node.childNodes[i]).addEventListener('click',function(){
        this.setAttribute('material',
          'color',Helper.getRandomColor());
      });
    }
  }

  static getRandomWalkways(numWalkways){
    let walkways = [];
    for (let i =0;i<numWalkways; i++){
      let position = Helper.getRandArrayWithMargin(300);
      walkways.push(
        <CubicWalkway position={position} length={Helper.getRandWithMargin(40,true)}>
        <a-event name="cursor-mouseenter" scale="3 1 1" color="#FFC65D"></a-event>
        <a-event name="cursor-mouseleave" scale="1 1 1" color="#F16745"></a-event>
        </CubicWalkway>
      );
    }
    return walkways;
  }

  getWalkway(){
    let blocks = [];
    let blockLength = 10;
    for (let i =0;i<this.props.length; i++){
      let position = [0,0,0];
      position[2] = (i*blockLength);
      let startPosition = position.slice(0);
      if (i !=0) startPosition[1] = -50;
      blocks.push(
        <Entity position={position} geometry={{primitive: 'box', width: 4, depth: blockLength}}  material={{opacity: i == 0 ? 1 : 0,color: Helper.getRandomColor()}} >
          {i == 0 ? '' : <Animation attribute="material.opacity" to="1" from="0" ease="linear" dur="5000" begin={i*1000} />}
          {/*TODO: Trigger falling down */}
        </Entity>
      );
    }
    return blocks;


  }

  render(){
    return(
      <Entity >
        {this.props.children}
        <Entity position={this.props.position} ref="walkway">  
          {this.getWalkway()}
        </Entity>
      </Entity>

    );
  }
}

CubicWalkway.defaultProps = {
  position: '0 0 0',
  length: 25,
};

export default CubicWalkway;