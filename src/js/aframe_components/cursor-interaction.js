AFRAME.registerComponent('cursor-interaction', {
  schema: {
    startPlay: {default: false}
  },

  // FOR TOUCH EVENTS ON MOBILE
  init: function () {
    var el = this.el;
    var data = this;data
    // Set color using raycaster parent color.
    el.addEventListener('click', function (evt) {
      console.log(evt);

      var node = $(".audio-player").data("audio-node");
      if (node){
        node.start(0);
      }
    });

/*    document.addEventListener('touchstart',function start(e){
      document.removeEventListener('touchstart',start,false);
      var node = $(".audio-player").data("audio-node");
      // document.getElementsByTagName('audio')[0].play();
      // document.getElementsByTagName('audio')[0].pause();
      node.start(0);
      node.stop(0);
    },false);*/


  }

});