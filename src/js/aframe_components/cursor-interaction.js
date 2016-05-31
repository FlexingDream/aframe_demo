AFRAME.registerComponent('cursor-interaction', {
  schema: {
    startPlay: {default: false}
  },

  // FOR TOUCH EVENTS ON MOBILE
  init: function () {
    var el = this.el;
    var data = this;data
    // Set color using raycaster parent color.
    /*8
    el.addEventListener('click', function (evt) {
      console.log(evt);

      var node = $(".audio-player").data("audio-node");
      if (node){
        node.start(0);
      }
    });
    */


    document.addEventListener('touchstart',function start(e){
      /**
      var node = $(".audio-player").data("audio-node");

      document.removeEventListener('touchstart',start,false);
      // document.getElementsByTagName('audio')[0].play();
      // document.getElementsByTagName('audio')[0].pause();
      node.start(0);
      node.stop(0);

      */
      var node = $('.audio-player').data('node');
      if (!node){
        return;
      }

      document.removeEventListener('touchstart',start,false);
      document.getElementById('scene').removeEventListener('start_song',this.startSong,false);
      document.getElementById('loaded-msg').emit('hide');
      node.start(0);
      document.getElementById('intro').emit('start_intro');

    },false);


  }

});
