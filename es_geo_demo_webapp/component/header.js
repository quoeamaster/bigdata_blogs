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
        window.eventBus.$emit('onNeighborhoodChosenUpdate', data);
      }
    },

    showAboutDlg: function () {
      document.querySelector('#h-modal-dlg').style.display = 'block';
    },
    closeModal: function () {
      document.querySelector('#h-modal-dlg').style.display = 'none';
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
  
  <!-- modal -->
  <!-- The Modal -->
  <div id="h-modal-dlg" class="h-modal">
    <span class="h-modal-close" v-on:click="closeModal()">&times;</span>
    <div class="h-modal-container">
      <div style="text-align: center; margin-bottom: 8px;">
        <span style="font-family: 'Comic Sans MS'; font-size: 1.1em; color: #666;">Singapore Taxi Availability</span> 
        is developed By 
        <span style="color: #FF9800; font-family: 'Comic Sans MS'; font-size: 1.0em;">Jason Wong</span>
      </div>
      <div style="width: 350px; margin: auto; margin-bottom: 40px;">
        <span style="font-size: 1.1em;">technology stack</span>
        <ul style="line-height: 40px;">
          <li class="h-modal-caption">
            <span class="h-modal-li-caption">datastore</span> 
            <span class="h-modal-li-bold-caption float-right">elasticsearch 7.5.x</span></li>
          <li class="h-modal-caption">
            <span class="h-modal-li-caption">frontend</span> 
            <span class="h-modal-li-bold-caption float-right">vue.js 2.6.x</span></li>
          <li class="h-modal-caption">
            <span class="h-modal-li-caption">css</span> 
            <span class="h-modal-li-bold-caption float-right">mdbootstrap 4.8.11</span></li>
          <li class="h-modal-caption">
            <span class="h-modal-li-caption">libraries</span> 
            <span class="h-modal-li-bold-caption float-right">jQuery 3.4.1</span> 
            <span class="h-modal-li-bold-caption float-right">vuex 3.1.x,&nbsp;</span></li>
          <li class="h-modal-caption">
            <span class="h-modal-li-caption">font resources</span> 
            <span class="h-modal-li-bold-caption float-right">font-awesome 5.8.2</span></li>
        </ul>
      </div>
      <!-- social media connections -->
      <div style="text-align: center;">
        <i class="fab fa-github cursor-pointer" 
          style="color: #666; font-size: 1.5em; margin-left: 4px; margin-right: 4px;" 
          onclick="window.open('https://github.com/quoeamaster', '_social');"></i>
        <i class="fab fa-medium cursor-pointer" 
          style="color: #666; font-size: 1.5em; margin-left: 4px; margin-right: 4px;"
          onclick="window.open('https://medium.com/@quoeamaster', '_social');"></i>
        <i class="fab fa-wordpress-simple cursor-pointer" 
          style="color: #666; font-size: 1.5em; margin-left: 4px; margin-right: 4px;"
          onclick="window.open('https://bigdata887.wordpress.com/2019/11/23/golang-dependency-management-part-1/', '_social');"></i>
      </div>
      <div class="float-right" style="display: block;">version <span style="font-family: 'Comic Sans MS'; font-size: 0.9em;">1.0.0</span></div>
    </div>
  </div>
  
</div>  
  `
});
