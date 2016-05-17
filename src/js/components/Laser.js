import {Animation, Entity} from 'aframe-react';
import React from 'react';
import 'aframe-layout-component';
class Lasers extends React.Component{
  static defaultProps = {
    radius: 16,
    numBlocks: 16,
    type: 'circle'
  };


  constructor(props){
    super(props);
  }

  shouldComponentUpdate(nextProps,nextState){
    return false;
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render(){
    var elements = [];

    var easings = ['linear','ease-in-cubic','ease-elastic','ease-out-quad','ease-in-expo','ease-in-out-cubic','ease-circ'];

    var laser_1 = React.createElement(Entity,{
      "mixin":"laser",
      "geometry":{
        height: 1000
      }
    },null);
    var anim = React.createElement(Animation,{
        attribute:"rotation",
        dur: 30000,
        repeat: 'indefinite',
        direction: 'alternate',
        easing: 'ease-in-out',
        to: '360 360 360'
      },null);

    if (this.props.type == 'circle'){
      var radius = this.props.radius;
      for (var i = 0;i < this.props.numBlocks; i++){
        // var y = this.props.heights[i]/32;
        var x,z,rad;
        rad = i * (2 * Math.PI)/ this.props.numBlocks;
        x = radius * Math.cos(rad);
        var y = 0;
        z = radius * Math.sin(rad);
        var randomEasing = easings[ i%(easings.length)];
        var newElement = React.cloneElement(laser_1, {
          position: [x,y,z],
          key: i, 
          material:{color: this.getRandomColor()},
          rotation: [45,45,45]
        },React.cloneElement(anim,{
          easing: randomEasing
        },null));
        elements.push(newElement);
      }
      return(<Entity>{elements}</Entity>);

    }
    else{
      for (var i = 0;i < this.props.numBlocks; i++){
        var randomEasing = easings[ i%(easings.length)];
        var newElement = React.cloneElement(laser_1, {
          key: i, 
          material:{color: this.getRandomColor()},
          rotation: [90, 90, 90]
        },React.cloneElement(anim,{
          easing: randomEasing
        },null));
        elements.push(newElement);
/*        elements.push(
          <Entity mixin="laser" geometry={{height: 1000}} key={i} material={{color: this.getRandomColor()}} rotation="90 90 90" collider>
            <Animation attribute="rotation" dur="30000" repeat="indefinite" direction="alternate" to="360 360 360" easing={randomEasing}/>
          </Entity>
        );*/
      }
      return(<Entity layout={{type: 'dodecahedron', margin:20, radius:80}} position={this.props.position} >{elements}</Entity>);
    }
  }
}

export default Lasers;