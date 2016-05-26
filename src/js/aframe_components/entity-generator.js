/* global AFRAME */

/**
 * Create ton of entities at random positions.
 * Update raycasters to realize the boxes.
 */
AFRAME.registerComponent('entity-generator', {
  schema: {
    mixin: {default: ''},
    numElements: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 50},
    minExclusion: {default: 0},
    maxExclusion: {default: 25}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;
    // Create entities with supplied mixin.
    for (var i = 0; i < data.numElements; i++) {
      var entity = document.createElement('a-entity');

      entity.setAttribute('mixin', data.mixin);
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpread(data.spread),
        y: getSpread(data.spread),
        z: getSpread(data.spread)
      });
      this.el.appendChild(entity);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});

AFRAME.registerComponent('entity-generator-positive-y', {
  schema: {
    mixin: {default: ''},
    numElements: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 50},
    minExclusion: {default: 0},
    maxExclusion: {default: 25}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;
    // Create entities with supplied mixin.
    for (var i = 0; i < data.numElements; i++) {
      var entity = document.createElement('a-entity');

      entity.setAttribute('mixin', data.mixin);
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        y: getPositiveSpread(data.spread,0,0),
        z: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion)
      });
      this.el.appendChild(entity);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});


AFRAME.registerComponent('entity-generator-primitive',{
  schema: {
    mixin: {default: ''},
    numElements: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 50},
    minExclusion: {default: 0},
    maxExclusion: {default: 25}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;
    // Create entities with supplied mixin.
    for (var i = 0; i < data.numElements; i++) {
      var entity = document.createElement('a-entity');
      entity.setAttribute('mixin', data.mixin);
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        y: getPositiveSpread(data.spread,data.minExclusion,data.maxExclusion),
        z: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion)
      });
      this.el.appendChild(entity);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});

AFRAME.registerComponent('entity-generator-collada',{
  schema: {
    collada: {default: ''},
    numElements: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 50},
    minExclusion: {default: 0},
    maxExclusion: {default: 25}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;
    // Create entities with supplied mixin.
    for (var i = 0; i < data.numElements; i++) {
      var entity = document.createElement('a-entity');
      entity.setAttribute('collada-model', data.collada);
      entity.setAttribute('rotation',{
        x:0,
        y:getRandomDegree(),
        z:0
      });
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        y: 0,
        z: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion)
      });
      this.el.appendChild(entity);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});

AFRAME.registerComponent('entity-generator-planets', {
  schema: {
    mixin: {default: ''},
    numElements: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 50},
    minExclusion: {default: 0},
    maxExclusion: {default: 25}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;
    // Create entities with supplied mixin.
    for (var i = 0; i < data.numElements; i++) {
      var entity = document.createElement('a-entity');
      entity.setAttribute('mixin', data.mixin);
      entity.setAttribute('geometry', {'radius': Math.random() * 25});
      entity.setAttribute('material',{'color':getRandomColor()});
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        y: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        z: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion)
      });
      this.el.appendChild(entity);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});

function getPositiveSpread(spread,minExclusion,maxExclusion){
  var value = 0;


  value = Math.floor(Math.random() * spread)+1;
  while(value<maxExclusion && value > minExclusion) return getPositiveSpread(spread,minExclusion,maxExclusion);

  return value;
}

function getRandomDegree(){
  var value = Math.random() * 360;
  return value;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function getSpecificSpread(spread,minExclusion,maxExclusion){
  var value = 0;


  value = Math.floor(Math.random() * spread)+1;
  value*=Math.floor(Math.random()*2) == 1 ? 1 : -1;
  while(value<maxExclusion && value > minExclusion) return getSpecificSpread(spread,minExclusion,maxExclusion);

  return value;
}

function getSpread (spread) {
  return Math.random() * spread - spread / 2;
}
