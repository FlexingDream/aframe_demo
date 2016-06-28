import {Animation, Entity} from 'aframe-react';
import 'aframe-layout-component';
import Helper from '../other/Helper';
import ColladaModel from './ColladaModel';
import ReactDOM from 'react-dom';
class RandomStars extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let node = ReactDOM.findDOMNode(this.refs.stars);
    let nodes = node.querySelectorAll('.star');
    for (let i =0;i<nodes.length; i++){
      nodes[i].addEventListener('click',function(){
        this.setAttribute('material','color',Helper.getRandomColor());
      })
    }
  }

  getPosition(){
    let margin = parseInt(this.props.margin);
    let startPosition = this.props.position.split(' ');
    let endPosition = startPosition.slice(0);
    endPosition[0] = parseInt(startPosition[0]) + Helper.getRandWithMargin(margin);
    endPosition[1] = parseInt(startPosition[1]) + Helper.getRandWithMargin(margin);
    endPosition[2] = parseInt(startPosition[2]) + Helper.getRandWithMargin(margin);
    return endPosition[0] + " " + endPosition[1] + " " + endPosition[2];
  }

  getRotation(){
    let x = Helper.getRandWithMargin(360);
    let y = Helper.getRandWithMargin(360);
    let z = Helper.getRandWithMargin(360);
    return x + " " + y + " " + z;
  }

  render(){
    let stars = [];

    for (let i = 0;i <this.props.numStars; i++){
      let position = this.getPosition();
      let rotation = this.getRotation();
/*      stars.push(
        <ColladaModel asset="#star-collada" scale="2 2 2" position={position} rotation={rotation}>
          {<Animation attribute="rotation" to="0 360 0"  dur="30000" repeat="indefinite" begin={i* 500}/>}
        </ColladaModel>
      );*/
      stars.push(
        <Entity class="star" geometry={{primitive: 'box'}} position={position} rotation={rotation}>
          <Animation attribute='scale' to={Helper.getRandArrayWithMargin(8,true)} from='1 1 1' begin='click' dur='4000' direction='alternate' fill='both' repeat='1' />
          <Animation attribute='rotation' to={Helper.getRandArrayWithMargin(360,true)} from={rotation} begin='click' dur='2000' direction='alternate' fill='both' repeat='3' />
        </Entity>
      );
    }
    return(
      <Entity class='stars' ref="stars">
        <Animation attribute="rotation" to="360 0 0"  dur="80000" repeat="indefinite" ease="linear"/>
        <Entity position={this.props.position}>
          {stars}
        </Entity>
      </Entity>
    );
  }
}

RandomStars.defaultProps = {
  position: "0 0 0",
  numStars: 150,
  margin: 600,
};

export default RandomStars;