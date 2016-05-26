import {Animation, Entity} from 'aframe-react';
import React from 'react';
import '../aframe_components/Collider';

class RainingObjects extends React.Component{
  static defaultProps = {
    animationDirection: {default: 'normal'},
    mixin: {default: ''},
    numElements: 2000,
    spread: 50,
    position: '0 10 0',
    duration: 16000,
    minExclusion: 0,
    maxExclusion: 25
  }
  constructor(props){
    super(props);
    this.state = {
    };
  }
  shouldComponentUpdate(nextProps,nextState){
    return false;
  }
  render(){
    return(
      React.createElement(Entity,
        {
          "entity-generator-positive-y": {
            numElements: this.props.numElements,
            mixin: this.props.mixin,
            spread:this.props.spread,
            minExclusion: this.props.minExclusion,
            maxExclusion: this.props.maxExclusion
          },
          position: this.props.position
        }
      ,React.createElement(Animation, 
        {
          attribute: "position",
          dur: this.props.duration,
          easing: "linear",
          repeat: "indefinite",
          to: this.props.position,
          direction: this.props.animationDirection
        })
      )
    );
  }
};

export default RainingObjects;