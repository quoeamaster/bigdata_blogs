
// util - cache object
// window.cacheObject = new CacheObject(20);

// event bus
window.eventBus = new Vue();
window.dimension = {
  w: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  h: window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight
};

/**
 * main application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  mounted: function() {
    let inst = this;
    window.eventBus.$on('onUpdateMapMarkersRequest', inst.onUpdateMapMarkersRequest);

    // load the api key
    jQuery.get('./../config/keys.md', {}, function (data) {
      if (data) {
        window.eventBus.$emit('onAKReceived', {'aK': data})
      }
    })
  },
  data: function() {
    return {
      /** store */
      store: new Vuex.Store({
        state: {
          neighborhoodChosen: {
            'name': 'Singapore',
            'lat': 1.352083,
            'lng': 103.819836
          },
          range: 4,
          rangeUnit: 'km'
        }, // end -- state
        mutations: {
          setNeighborhoodChosen (state, data) {
            state.neighborhoodChosen = data;
          },
          setRange (state, data) {
            state.range = data;
          },
          setRangeUnit (state, data) {
            state.rangeUnit = data;
          }
        } // end -- mutations
      }) // end -- store (vuex)
    };
  },
  methods: {
    onUpdateMapMarkersRequest: function(data) {
      let _chosen = this.store.state.neighborhoodChosen;
      // update the center of the map plus...
      // do an ES geo_distance query ...
      // then add markers
    },
    preloadImages: function () {
      // TODO: preload images if necessary
    }
  }
});

