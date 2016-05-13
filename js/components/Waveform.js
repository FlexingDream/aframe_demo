import {Entity,Animation} from 'aframe-react';
import React from 'react';
import _ from 'underscore';

class Waveform extends React.Component{
  static defaultProps = {
    numBlocks: 16,
    radius: 16
  };
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  constructor(props){
    super(props);
  }
  shouldComponentUpdate(nextProps,nextState){
    return !_.isEqual(nextProps.heights,this.props.heights);
  }
  render(){
    var elements = [];
    var template = React.createElement(Entity, {
      mixin: "waveform",
    },null);
    var radius = this.props.radius;
    for (var i = 0;i < this.props.numBlocks; i++){
      // var y = this.props.heights[i]/32;
      var x,z,rad;
      rad = i * (2 * Math.PI)/ this.props.numBlocks;
      x = radius * Math.cos(rad);
      var y = 0;
      var height = this.props.heights[i] == 0 ? 0.5 : this.props.heights[i]/256;
      z = radius * Math.sin(rad);
      var newElement = React.cloneElement(template, {position: [x,y,z],key: i, geometry:{radius: height}, material:{color: this.getRandomColor()}},null);
      elements.push(newElement);
    }
    return(
      <Entity>
        <Animation attribute="rotation" to="0 360 0" dur="50000" repeat="indefinite" direction="alternate"/>
        {elements}
      </Entity>
    );
  }
}

export default Waveform;