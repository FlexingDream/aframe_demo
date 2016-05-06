import {Animation, Entity} from 'aframe-react';
import React from 'react';
import 'aframe_components/RayCaster';
export default props => {
  const geometry = {
    primitive: 'ring',
    radiusInner: 0.01,
    radiusOuter: 0.016
    // radius: 0.5,
    // height: 1
  };
  const material = {
    color: props.color,
    shader: 'flat',
    opacity: props.opacity || 0.9,
    transparent: true
  };
  const cursor = {

  };
  const raycaster = {
    objects: '.lookable',
    far: 1000
  }
  return (
    <Entity raycaster-helper raycaster={raycaster} cursor={cursor} geometry={geometry} material={material} position="0 0 -1">
      <Animation begin="click" easing="ease-in" attribute="scale"
                     fill="backwards" from="0.1 0.1 0.1" to="1 1 1"/>
        <Animation begin="fusing" easing="ease-in" attribute="scale"
                     fill="forwards" from="3 3 3" to="0.1 0.1 0.1"/>         
    </Entity>
  );
}
