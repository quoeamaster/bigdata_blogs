Vue.component('map-instance', {
  props:['store'],
  data: function() {
    return {
      mapInstance: {},
      mapHeight: 600,
      markers: []
    };
  },
  mounted: function() {
    let inst = this;
    window.eventBus.$on('onAKReceived', inst.initMap);
    window.eventBus.$on('onGeoDistanceResults', inst.setGeoDistanceResults)
  },
  methods: {
    initMap: function (data) {
      //this.mapInstance =
      let aK = data['aK'];
      let eScript = document.createElement('script');
      eScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+aK);
      document.body.appendChild(eScript);

      let inst = this;
      setTimeout(function () {
        let _tempMarkers = inst.setMapCenterWivMarker();
        inst.markers = inst.markers.concat(_tempMarkers);
      }, 1000);

    },
    setMapCenterWivMarker: function() {
      let _r = _setMapCenterWivMarker(this.store, this.mapInstance);
      this.markers = this.markers.concat(_r['marker']);
      this.mapInstance = _r['mapInstance'];
    },

    setGeoDistanceResults: function(data) {
      let _d = data['data']['hits']['hits'];
      let _c = data['center'];
      let _tempMarkers;

      // reset existing marker(s) first
      this.resetMarkers();
      // set center marker plus centering the map
      _tempMarkers = _setMarker({ lat: _c.lat, lng: _c.lng }, false, this.mapInstance, true, _c['name']);
      this.markers = this.markers.concat(_tempMarkers);

      let inst = this;
      _d.forEach(function (_hit) {
        let _src = _hit['_source'];
        let _loc = _src['location'];
        _loc['name'] = _src['geo']['formatted'];
        _tempMarkers = _setMarker({ lat: _loc['lat'], lng: _loc['lon'] }, true, inst.mapInstance, false, _loc['name']);
        inst.markers = inst.markers.concat(_tempMarkers);
      });
      // center and fit all markers to map
      _setMap2FitAllMarkers(this.markers, this.mapInstance);
    },
    resetMarkers: function() {
      this.markers.forEach(function (_m) {
        if (_m) {
          _m.setMap(null);
        }
      });
      this.markers=[];
    },

    /*
     *  method to calculate the height of the map dynamically (cal only once - on init)
     */
    getMapHeightStyle: function () {
      let c = {};
      c['height']=(window.dimension.h-60)+'px';
      return c;
    }

  },
  template: `
<div>
  <div id="_gmap_" class="gm-canvas" v-bind:style="getMapHeightStyle()"></div>
</div>
  `
});
