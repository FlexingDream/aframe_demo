import {Entity,Animation} from 'aframe-react';
import Helper from '../other/Helper';
import ReactDOM from 'react-dom';
class CubicFoldable extends React.Component{
  constructor(props){
    super(props);
  }

  static getMixins(){
    return[
      <a-mixin id="board" geometry="depth: 0.01; height:4; width: 20;primitive:box" material="shader: flat"
      pivot="0 0.5 0" position="0 -4 0" rotation="180 0 0"></a-mixin>,
      <a-mixin id="unhinge" attribute="rotation"  dur="1000" fill="both"></a-mixin>
    ];
  }
  getFoldNumber(index){
    if (index == this.props.numFolds)
      return(
        <Entity mixin="board" material={{color: Helper.getRandomColor()}} geometry={{width: this.props.width}}>
          <Animation mixin='unhinge' to="0 0 0" from='-180 0 0' begin={300 * index}/>
        </Entity>
      );
    else 
      return(
        <Entity mixin="board" material={{color: Helper.getRandomColor()}} geometry={{width: this.props.width}}>
          <Animation mixin='unhinge' to="0 0 0" from='-180 0 0' begin={300* index} />
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
};

export default CubicFoldable;