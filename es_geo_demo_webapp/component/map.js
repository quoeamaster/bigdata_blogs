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
        inst.setMapCenterWivMarker();
      }, 1000);

    },
    setMapCenterWivMarker: function() {
      _setMapCenterWivMarker(this.store, this.mapInstance);
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
