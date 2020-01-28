
Vue.component('search-header', {
  props: ['store'],
  data: function() {
    return {
      searchbarText: this.store.state.searchbarText
    };
  },
  methods: {
    doHeaderSearch: function () {
      this.store.commit('setSearchbarText', this.searchbarText);
      //jQuery
      let q = {
        "query": {
          "multi_match": {
            "query": this.searchbarText,
            "fields": ["name", "desc"]
          }
        }
      };
      window.eventBus.$emit('on-query-request', { 'query': q });
      //this.$emit('onQueryRequest', { 'query': q });
    },
    showAbout: function () {
      document.querySelector('#h-modal-dlg').style.display = 'block';
    },
    closeModal: function () {
      document.querySelector('#h-modal-dlg').style.display = 'none';
    }

  },
  template: `
<div class="h-header-div">
  <div class="float-left" >
    <span class="h-title" style="padding-right: 40px;">Bookstore Eureka~</span>
    <i class="fas fa-search cursor-pointer" style="color: #666; font-size: 1.1em; padding-right: 4px;"></i>
    <input type="text"
      v-on:keyup.enter="doHeaderSearch()"
      v-model="searchbarText"
      placeholder="book title for search..." 
      class="h-searchbar">
  </div>
  <div class="float-right" >
    <span class="h-caption cursor-pointer" v-on:click="showAbout()">
      About
    </span>
  </div>
  
  <!-- modal -->
  <!-- The Modal -->
  <div id="h-modal-dlg" class="h-modal">
    <span class="h-modal-close" v-on:click="closeModal()">&times;</span>
    <div class="h-modal-container">
      <div style="text-align: center;">
        <span style="font-family: 'Comic Sans MS'; font-size: 1.2em; color: #666;">bookstore Eureka</span> 
        is developed By 
        <span style="color: #FF9800; font-family: 'Comic Sans MS'; font-size: 1.1em;">Jason Wong</span>
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
