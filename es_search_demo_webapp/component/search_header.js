
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
    <span class="h-caption cursor-pointer">
      About
    </span>
  </div>
  
</div>
  `
});
