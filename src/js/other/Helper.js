class Helper{
  static MODEL_LOCATION = "3d_models/";

  static chainTimingEvents(chainEventsArray){
    if (chainEventsArray<=0) return;
    var that = this;
    var newEvent = chainEventsArray.pop();
    setTimeout(function(){
      document.querySelector(newEvent.querySelector).emit(newEvent.emitEvent);
      that.chainTimingEvents(chainEventsArray);
    },newEvent.delay);
  }
  static showTimer(){
    var timestamp = document.createElement('span');document.body.appendChild(timestamp);timestamp.style.position='absolute';timestamp.style.top = '20px';timestamp.style.right = '20px';timestamp.style.color='white';var ascene=document.querySelector('a-scene');
    window.setInterval(function(){timestamp.textContent = parseFloat(ascene.time/1000).toFixed(2)}, 100);
  }

  static getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  static getRandWithMargin(margin,posOnly=false){
    var value = 0;
    value = Math.floor(Math.random() * margin)+1;
    if (!posOnly)
      value*=Math.floor(Math.random()*2) == 1 ? 1 : -1;
    return value;
  }

  static getRandArrayWithMargin(margin,posOnly=false){
    let array = [0,0,0]
    for (let i =0;i<3; i++){
      var value = 0;
      value = Math.floor(Math.random() * margin)+1;
      if (!posOnly)
        value*=Math.floor(Math.random()*2) == 1 ? 1 : -1;
      array[i] = value;
    }
    return array;
  }

  /**
 * Stringify components passed as an object.
 *
 * {primitive: box; width: 10} to 'primitive: box; width: 10'
 */
 static serializeComponents (props) {
    let serialProps = {};
    Object.keys(props).forEach(component => {
      if (['children', 'mixin'].indexOf(component) !== -1) { return; }

      if (props[component].constructor === Function) { return; }

      if (props[component].constructor === Array) {
        //Stringify components passed as array.
        serialProps[component] = props[component].join(' ');
      } else if (props[component].constructor === Object) {
        // Stringify components passed as object.
        serialProps[component] = styleParser.stringify(props[component]);
      } else {
        // Do nothing for components otherwise.
        serialProps[component] = props[component];
      }
    });
    return serialProps;
  }
}

export default Helper;
