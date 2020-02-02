Vue.component('geo-header', {
  props: ['store'],
  data: function() {
    return {
      neighbourhoodList: [],
      shouldNhoodDivShow: false
    };
  },
  mounted: function () {
    let inst = this;
    jQuery.get('./../config/nhood.json', {}, function(data) {
      inst.neighbourhoodList = data['neighborhood'];
    });
  },
  methods: {
    showAboutDlg: function () {
      alert('tbd');
    },
    getNhoodList: function () {
      return this.neighbourhoodList;
    },
    showNhoodDlg: function () {
      this.shouldNhoodDivShow = !this.shouldNhoodDivShow;
    },
    getNHoodContainerCss: function () {
      let c = {};
      c['h-nhood-container-200'] = this.shouldNhoodDivShow === true;
      return c;
    },
    setNeighborhoodChosen: function (data) {
      if (data) {
        this.store.commit('setNeighborhoodChosen', data);
        this.shouldNhoodDivShow = !this.shouldNhoodDivShow; // OR just hard code as FALSE
        window.eventBus.$emit('onUpdateMapMarkersRequest', null);
      }
    }

  },
  template: `
<div>
  <div class="h-container">
    <div class="float-left h-title h-font h-font-grey">Singapore Taxi Availability</div>
    <div class="float-right h-caption h-font h-font-grey cursor-pointer" v-on:click="showAboutDlg()">About</div>
    <div class="float-right h-caption h-font h-font-grey cursor-pointer" v-on:click="showNhoodDlg()" style="margin-right: 12px;">Neighborhood</div>
  </div>
  <!-- neighbourhood list -->
  <div class="h-nhood-container" v-bind:class="getNHoodContainerCss()">
    <button v-for="place in getNhoodList()" 
      class="h-nhood-label cursor-pointer" v-on:click="setNeighborhoodChosen(place)">
      <i class="fas fa-map-marker-alt" style="margin-right: 4px;"></i>{{place.name}}
    </button>
  </div>
</div>  
  `
});
