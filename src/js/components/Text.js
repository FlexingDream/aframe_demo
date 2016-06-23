import {Animation, Entity} from 'aframe-react';
import Helper from '../other/Helper';
import 'aframe-text-component';

class Text extends React.Component{
  constructor(props){
    super(props);
  }
  getLength(){
    let text = this.props.text.split('');
    let length = (text.length > 1 ? text.length -1 : 1) * this.props.size;
    return length;
  }

  static getLength(text){
    let textArray = text.props.text.split('');
    let length = textArray.length * text.props.size;
    return length;
  }

  render(){
    let position = typeof(this.props.position) == 'object' ? this.props.position : this.props.position.split(' ');
    if (this.props.shouldCenter){

      let axis = this.props.axis;
      let positionToChange = -1;
      let startPoint = length / 2;
      if (axis == 'x') positionToChange=0;
      else if (axis == 'y')positionToChange=1;
      else if (axis == 'z')positionToChange=2;
      position[positionToChange] -=startPoint;
    }

    return(
      <Entity class='text'>
        {this.props.children}
        <Entity position={position}>
          <Entity text={{font:this.props.font, text: this.props.text, height: this.props.depth, size: this.props.size}} visible={this.props.visible}/>
        </Entity>
      </Entity>
    );
  }
}
Text.defaultProps = {
  position: '0 0 0',
  text: '',
  depth: 0.05,
  size: 5,
  font: 'helvetiker',
  shouldCenter: true,
  axis: 'x',
  visible: true,
};

export default Text;