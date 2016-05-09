AFRAME.registerComponent('cursor-interaction', {
  schema: {
    startPlay: {default: false}
  },

  init: function () {
    var el = this.el;
    var data = this;data
    // Set color using raycaster parent color.
    el.addEventListener('cursor-click', function (evt) {
      console.log(evt);

      if (!data.startPlay){
        document.getElementsByTagName('audio')[0].play(); 
        data.startPlay = true;
      }
    });

    document.addEventListener('touchstart',function start(e){
      document.removeEventListener('touchstart',start,false);
      document.getElementsByTagName('audio')[0].play();
      document.getElementsByTagName('audio')[0].pause();
    },false);


  }

});