/**
  mobile-touch-interaction.js
  Fixes touch mainly for iOS. Put on component to enable touch on it.
  Require's jquery
*/

AFRAME.registerComponent('mobile-touch-interaction', {
  schema: {
    startPlay: {default: false}
  },

  // FOR TOUCH EVENTS ON MOBILE
  init: function () {

    document.addEventListener('touchstart',function start(e){

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
