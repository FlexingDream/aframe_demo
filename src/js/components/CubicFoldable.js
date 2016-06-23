import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import ReactDOM from 'react-dom';
class CubicFoldable extends React.Component{
  constructor(props){
    super(props);
  }

  triggerClick(){
    let node = ReactDOM.findDOMNode(this.refs.firstBoard);
    let chainEvents = [];
    let that = this;
    let nodes = node.querySelectorAll('.cubic-fold');
    node.removeEventListener('click',this.triggerClick);
    for (let i =0;i<nodes.length;i++){
      chainEvents.push({
        querySelector: nodes[i],
        emitEvent: 'unfold',
        delay: 1
      });
    }
    that.chainTimingEvents(chainEvents);
  }

  componentDidMount(){
    if (this.props.trigger){
      let that = this;
      let chainEvents = [];
      let node = ReactDOM.findDOMNode(this.refs.firstBoard);
      node.addEventListener('click',this.triggerClick.bind(this));
    }
  }
  chainTimingEvents(chainEventsArray){
    if (chainEventsArray<=0) return;
    var that = this;
    var newEvent = chainEventsArray.pop();
    setTimeout(function(){
      newEvent.querySelector.emit(newEvent.emitEvent);
      that.chainTimingEvents(chainEventsArray);
    },newEvent.delay);
  }

  static getMixins(){
    return[
      <a-mixin id="board" geometry="depth: 0.01; height:4; width: 20;primitive:box" material="shader: flat"
      pivot="0 0.5 0" position="0 -4 0" rotation="180 0 0"></a-mixin>,
      <a-mixin id="unhinge" attribute="rotation"  dur="1000" fill="both"></a-mixin>
    ];
  }
  getFoldNumber(index){
    let ref = '';
    let position = [0,-4,0];
    if (this.props.direction == "-") position[1]*=-1;
    if (index == 1) ref='firstBoard';
    if (index == this.props.numFolds)
      return(
        <Entity class="cubic-fold" ref={ref} mixin="board" material={{color: Helper.getRandomColor()}} geometry={{width: this.props.width}} position={position}>
          <Animation mixin='unhinge' to="0 0 0" from='-180 0 0' begin={this.props.trigger? 'unfold' : 300 * index}/>
        </Entity>
      );
    else 
      return(
        <Entity class="cubic-fold" ref={ref} mixin="board" material={{color: Helper.getRandomColor()}} geometry={{width: this.props.width}} position={position}>
          <Animation mixin='unhinge' to="0 0 0" from='-180 0 0' begin={this.props.trigger? 'unfold' : 300* index} />
          {this.getFoldNumber(++index)}
        </Entity>
      );
  }

  render(){
    return(
      <Entity>
        {this.props.children}
        <Entity position={this.props.position} rotation={this.props.rotation}>
          {this.getFoldNumber(1)}
        </Entity>
      </Entity>

    );
  }
}

CubicFoldable.defaultProps = {
  numFolds: 5,
  position: '0 0 0',
  rotation: '0 0 0',
  width: 4,
  direction: "+",
  trigger: false,
};

export default CubicFoldable;