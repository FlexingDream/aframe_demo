AFRAME.registerComponent('collider', {
  dependencies: ['raycaster'],
  init: function () {
    console.log('init collider');
    var el = this.el;

    // Set color using raycaster parent color.
    el.addEventListener('raycaster-intersected', function (evt) {
      console.log('intersected');
    });

    // Reset color.
    el.addEventListener('raycaster-intersected-cleared', function (evt) {
      console.log('intersected cleared');
    });
  }
});