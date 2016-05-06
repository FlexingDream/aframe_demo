AFRAME.registerComponent('track-tick',{
  init:function(){
    console.log('inited');
    var data = this.data;
    console.log(data);
  },

  tick(t){
    console.log(t);
  }
});