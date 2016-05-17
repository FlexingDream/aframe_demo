/* global AFRAME */

/**
 * Change color if entity when intersected by raycaster.
 */
AFRAME.registerComponent('intersect-color-change', {
  init: function () {
    var el = this.el;
    var material = el.getComputedAttribute('material');
    var initialColor = material.color;
    var initialOpacity = material.opacity;
    // Set color using raycaster parent color.
    el.addEventListener('raycaster-intersected', function (evt) {
      console.log('raycaster intersected');
      var raycasterEl = evt.detail.el;
      var fingerColor = raycasterEl.parentNode.getComputedAttribute('material').color;
      el.setAttribute('material', 'color', fingerColor);
      el.setAttribute('material', 'opacity', 1.0);
    });

    // Reset color.
    el.addEventListener('raycaster-intersected-cleared', function (evt) {
      el.setAttribute('material', 'color', initialColor);
      el.setAttribute('material', 'opacity', initialOpacity);
    });
  }
});
