import {Animation, Entity} from 'aframe-react';
import Helper from '../other/Helper';
import 'aframe-text-component';
import Text from './Text';
class TextGroup extends React.Component{
  constructor(props){
    super(props);
  }

  getPosition(){
    let origPosition = typeof(this.props.position) == 'object' ? this.props.position : this.props.position.split(' ');
    let newPosition = origPosition.slice(0);
    let children = this.props.children;
    let total = 0;
    for (let child of children){
      total+=Text.getLength(child) + this.props.margin;
    }
    newPosition[0]-=total/2;
    return newPosition;
  }
  getChildren(){
    let texts = [];
    let currentPosition = this.getPosition().slice(0);
    for (let i =0;i<this.props.children.length;i++){
      let child = this.props.children[i];
      let props = child.props;
      currentPosition[0] = parseInt(currentPosition[0]) + (Text.getLength(child)) + this.props.margin;
      currentPosition[0] = currentPosition[0].toString();
      let thisPosition = currentPosition.slice(0);
      let newText = <Text text={props.text} size={props.size} shouldCenter={false} position={i == 0 ? this.getPosition() : thisPosition} visible={props.visible}>
        {props.children}
      </Text>
      texts.push(newText);
    }
    return texts;
  }

  render(){
    return(
      <Entity class="text-group">
        <Entity position={this.props.position}>
          {this.getChildren()}
        </Entity>
      </Entity>
    );
  }
}
TextGroup.defaultProps = {
  position: '0 0 0',
  shouldCenter: true,
  axis: 'x',
  margin: 0,
};
TextGroup.propTypes = {
  children: React.PropTypes.instanceOf(Text),
};


export default TextGroup;