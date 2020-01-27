
// util - cache object
window.cacheObject = new CacheObject(20);

/**
 * main application entry point
 * @type {Vue}
 * @private
 */
new Vue({
  el: '#app',
  data: function() {
    return {
      /** store */
      store: new Vuex.Store({
        state: {
          searchbarText: ''
        }, // end -- state
        mutations: {
          setSearchbarText (state, text) {
            state.searchbarText = text;
          }
        } // end -- mutations
      }) // end -- store (vuex)
    };
  },
  methods: {
    preloadImages: function () {
      // TODO: preload images if necessary
    }
  }
});

