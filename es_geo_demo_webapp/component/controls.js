Vue.component('map-controls', {
  props: ['store'],
  mounted: function() {
    window.eventBus.$on('onAKReceived', this.getAK);
  },
  data: function() {
    return {
      aK: '',
      address: '',
      range: 4,
      rangeUnit: 'km',
      info: 'testing'
    };
  },
  methods: {
    getAK: function(data) {
      this.aK = data['aK'];
    },
    updateInfo: function(loc) {
      this.info = loc.name+' => (lat='+loc.lat+', lng='+loc.lng+')';
    },
    updateLocation: async function () {
      // call geocoding api to get the lat, lng pair based on the given address ("+singapore" to make sure the correct data is returned)
      let _geoData = {};
      let _promise = _getLatLngByAddress(this.address, this.aK);
      await _promise.then(function (data) {
        _geoData = data;
      });
      //console.log(_geoData);
      let _loc = {};
      if (_geoData.results.length > 0) {
        let _r = _geoData.results[0];
        _loc = _r['geometry']['location'];
        _loc['name'] = _r['formatted_address'];
      }
      this.updateInfo(_loc);
      // update store
      this.store.commit('setNeighborhoodChosen', _loc);
      this.raiseUpdateMapMarkersRequest();
    },
    updateRange: function() {
      this.store.commit('setRange', this.range);
      this.raiseUpdateMapMarkersRequest();
    },
    updateRangeUnit: function() {
      this.store.commit('setRangeUnit', this.rangeUnit);
      this.raiseUpdateMapMarkersRequest();
    },

    raiseUpdateMapMarkersRequest: function () {
      window.eventBus.$emit('onUpdateMapMarkersRequest', null);
    }
  },
  template: `
<div class="mc-container">
  <input class="mc-control form-control form-text"
    v-on:change="updateLocation" 
    placeholder="targeted address / location (e.g. River Valley)" v-model="address">
  
  <input class="mc-control form-control form-text float-left" style="width: 60%; "
    v-on:change="updateRange"
   placeholder="range of taxi to retrieve" v-model="range">
  <select class="mc-control form-control float-right"
    v-on:change="updateRangeUnit" 
    style="width: 40%; " v-model="rangeUnit">
    <option value="m">meter</option>
    <option value="km">kilometer</option>
  </select>
  <p/>
  
  <div class="mc-control mc-info" style="margin-top: 80px;">
    {{info}}
  </div>
  
</div>
  `
});
