Vue.component('s-prefix-query', {
  methods: {
    runSearch: function () {
      console.log('run a search - prefix query')
    }
  },
  template: `
<div class="s-accordion-detail-container s-main-closer">
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-full-text">
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
