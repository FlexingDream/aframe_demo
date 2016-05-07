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

AFRAME.registerComponent('entity-generator-stars', {
  schema: {
    mixin: {default: ''},
    num: {default: 2000},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 100},
    minExclusion: {default: 0},
    maxExclusion: {default: 50}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;

    // Create entities with supplied mixin.
    for (var i = 0; i < data.num; i++) {
      var entity = document.createElement('a-entity');

      entity.setAttribute('mixin', data.mixin);
      // Set random position with supplied spread.
      entity.setAttribute('position', {
        x: getSpread(data.spread),
        y: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
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

AFRAME.registerComponent('entity-generator-trees', {
  schema: {
    mixin: {default: ''},
    num: {default: 160},
    raycasterEls: {default: '[mixin~="raycaster"]', type: 'selectorAll'},
    spread: {default: 60},
    minExclusion: {default: -10},
    maxExclusion: {default: 10}
  },

  // TODO: make the position of the elements depending on starting position
  init: function () {
    var data = this.data;

    // Create entities with supplied mixin.
    for (var i = 0; i < data.num; i++) {
      var base = document.createElement('a-entity');
      var leaf = document.createElement('a-entity');
      base.setAttribute('mixin', data.mixinTree);
      leaf.setAttribute('mixin', data.mixinLeaf);

      // Set random position with supplied spread.
      base.setAttribute('position', {
        x: getSpecificSpread(data.spread,data.minExclusion,data.maxExclusion),
        y: 0,
        z: getSpecificSpread(data.spread,0,0)
      });

      leaf.setAttribute('position',{
        x:0,
        y: 1,
        z:0
      });
      base.appendChild(leaf);
      this.el.appendChild(base);
    }
    // Refresh raycasters.
    if (!data.raycasterEls) { return; }
    for (i = 0; i < data.raycasterEls.length; i++) {
      data.raycasterEls[i].components.raycaster.refreshObjects();
    }
  }
});
function getSpecificSpread(spread,minExclusion,maxExclusion){
  var value = 0;
  value =Math.random() * spread - spread / 2;
  while(value<maxExclusion && value > minExclusion) value = Math.random() * spread - spread/2;

  return value;
}

function getSpread (spread) {
  return Math.random() * spread - spread / 2;
}
