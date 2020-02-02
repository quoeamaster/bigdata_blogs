
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
      esConnection: null,
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
      let _dist = this.store.state.range+this.store.state.rangeUnit;
      let _dRange = this.store.state.rangeUnit;
      // do an ES geo_distance query ...
      // update the center of the map plus...
      // then add markers
      this.getESConnection().search({
        index: 'sg_taxi_location',
        body: {
          "query": {
            "geo_distance": {
              "distance": _dist,
              "location": {
                "lon": _chosen.lng,
                "lat": _chosen.lat
              }
            }
          },
          "sort": [
            {
              "_geo_distance": {
                "location": {
                  "lon": _chosen.lng,
                  "lat": _chosen.lat
                },
                "order": "asc",
                "unit": _dRange,
                "distance_type": "plane"
              }
            }
          ]
        },
        size: 1000,
        filterPath: 'hits.total.value,hits.hits._source.location,hits.hits._source.geo'
      }).then(function(data) {
        window.eventBus.$emit('onGeoDistanceResults', {
          'data': data,
          'center': _chosen
        });
      }, function(err) { console.log(err); });
    },
    getESConnection: function () {
      if (!this.esConnection) {
        this.esConnection = new jQuery.es.Client({hosts: ["http://localhost:9200"]});
      }
      return this.esConnection;
    },

    preloadImages: function () {
      // TODO: preload images if necessary
    }
  }
});

