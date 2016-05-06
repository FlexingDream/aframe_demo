AFRAME.registerComponent('collider', {
    init: function () {

      var el = this.el;
      el.addEventListener('click',function(e){

      });

      el.addEventListener('raycaster-intersected', function (evt) {
        var raycasterEl = evt.detail.el;
        el.setAttribute('visible', false);
      });

      el.addEventListener('raycaster-intersected-cleared', function (evt) {
        el.setAttribute('visible', true);
      });

      el.addEventListener('raycaster-intersection',function(e){
        console.log(e);
      });
    }
  });