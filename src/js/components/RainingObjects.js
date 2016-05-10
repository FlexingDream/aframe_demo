import {Animation, Entity} from 'aframe-react';
import React from 'react';

class RainingObjects extends React.Component{
  static defaultProps = {
    animationDirection: {default: 'normal'},
    mixin: {default: ''},
    numElements: 2000,
    spread: 50
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
          "entity-generator" : {
            numElements: this.props.numElements,
            mixin: this.props.mixin,
            spread:this.props.spread,
          },
          position: "0 10 0"
        }
      ,React.createElement(Animation, 
        {
          attribute: "position",
          dur: "16000",
          easing: "linear",
          repeat: "indefinite",
          to: "0 0 0",
          direction: this.props.animationDirection
        })
      )
    );
  }
};

export default RainingObjects;