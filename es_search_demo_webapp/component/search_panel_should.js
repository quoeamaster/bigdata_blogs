Vue.component('s-should-query', {
  methods: {
    runSearch: function () {
      console.log('run a search - should query')
    }
  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">book name</div>
  <input type="text" class="s-50-text s-full-text">
  <input type="checkbox" class="s-cbox" name="cbox_match_name_should">nice to match?</input>
  
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-50-text s-full-text">
  <input type="checkbox" class="s-cbox" name="cbox_match_desc_should">nice to match?</input>
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
