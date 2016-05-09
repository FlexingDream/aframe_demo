AFRAME.registerComponent('cursor-interaction', {
  init: function () {
    var el = this.el;

    // Set color using raycaster parent color.
/*    el.addEventListener('cursor-click', function (evt) {
      console.log(evt);
      document.getElementsByTagName('audio')[0].play();
    });*/

    window.addEventListener('touchstart', function(){
      document.getElementsByTagName('audio')[0].play();
      // document.getElementsByTagName('audio')[0].pause();
    });


  }
});