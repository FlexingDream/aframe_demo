/* global AFRAME */

AFRAME.registerComponent('chain-events', {
  init: function () {
    let el = this.el;
    console.log(el);
    el.addEventListener('animationend',function(e){

    });
  }
});
