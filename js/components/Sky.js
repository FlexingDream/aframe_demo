import {Entity,Animation} from 'aframe-react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class Sky extends React.Component{

  // TODO: Set default properties
  constructor(props){
    super(props);
  }
  render(){
    return(
      <Entity geometry={{primitive: 'box',height: 3000,width:3000,depth:3000, radius: 3000}}
          material={{color: this.props.color || 'white', shader: 'flat', fog: false}}
          scale="1 1 -1">
        {this.props.children}
      </Entity>
    );
  }
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

}

export default Sky;
