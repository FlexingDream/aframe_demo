import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
class CubicSnake extends React.Component{
  constructor(props){
    super(props);
  }
  static getRandWithMargin(margin){
    let array = [0,0,0]
    for (let i =0;i<3; i++){
      var value = 0;
      value = (Math.random() * margin)+1;
      array[i] = value;
    }
    return array;
  }

  static getRandomSnakes(numSnakes){
    let snakes = [];
    for (let i =0;i<numSnakes; i++){
      let position = Helper.getRandArrayWithMargin(25);
      let endPosition = position.slice(0);
      endPosition[2] = Helper.getRandWithMargin(400);
      let randScale = CubicSnake.getRandWithMargin(1);
      snakes.push(
        <CubicSnake position={position}>
          <Animation attribute="scale" to={randScale} dur="10000" repeat="indefinite" ease="linear" from="1 1 1" direction="alternate" />
          <Animation attribute="position" to={endPosition} dur="60000" ease="linear" direction="alternate" repeat="indefinite" from={position} />
        </CubicSnake>
      );
    }
    return snakes;
  }

  getSnake(){

    let snakes = [];
    let index = 1;
    let dir = 1;
    let blockLength = 1;
    for (let i =0;i<this.props.length; i++){
      let position=[0,0,0];
      if (index%3==0)position[1] = 1;
      else if (index%2==0) position[1] = 0.5;
      else position[1] = 0;

      position[2] = i * blockLength;
      let endPosition = position.slice(0);
      endPosition[1]*=-1;
      snakes.push(
        <Entity geometry={{primitive: 'box', height: 1, width: 1, depth: blockLength}} position={position} material={{color: Helper.getRandomColor()}} rotation="0 0 0">  
          <Animation attribute="position" to={endPosition} from={position} repeat="indefinite" dur="10000" ease="linear" direction="alternate" />
        </Entity>
      );
      if (index == 3) dir = 0;
      if (index == 1) dir = 1;
      if (dir) index++;
      else index--
    }
    return snakes;

  }

  render(){
    return(
      <Entity>
        {this.props.children}
        <Entity position={this.props.position}>
          {this.getSnake()}
        </Entity>
      </Entity>

    );
  }
}

CubicSnake.defaultProps = {
  position: '0 0 0',
  length: 12
};

export default CubicSnake;