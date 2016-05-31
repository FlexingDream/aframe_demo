import {Animation, Entity} from 'aframe-react';
import React from 'react';
import 'aframe_components/raycaster-helper';
import 'aframe_components/cursor-interaction';
export default props => {
  const geometry = {
    primitive: 'ring',
    radiusInner: 0.01,
    radiusOuter: 0.016
    // radius: 0.5,
    // height: 1
  };
  const material = {
    color: props.color || 'white',
    shader: 'flat',
    opacity: props.opacity || 0.9,
    transparent: true
  };
  const raycaster = {
    objects: props.target,
    far: 1000
  }
  return (
    <Entity  cursor={props.cursor} geometry={geometry} material={material} position="0 0 -1">
      <Animation attribute="scale" begin="click" dur="150" fill="backwards" to="0 0 0"/>
     <Animation attribute="scale" begin="fusing" easing="ease-in" fill="backwards" from="1 1 1" to="0.1 0.1 0.1"
       dur="1500"/> 
    </Entity>
  );
}
