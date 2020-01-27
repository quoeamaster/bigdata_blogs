Vue.component('s-sort-query', {
  methods: {
    runSearch: function () {
      console.log('run a search - sort query')
    }
  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed" style="display: inline-block; margin-right: 4px; width: 50%;">publish date</div>
  <input type="radio" class="s-cbox" name="cbox_asc_date_sort">asc</input>
  <input type="radio" class="s-cbox" name="cbox_asc_date_sort">des</input>
  <br/>
  <div class="s-caption-detailed" style="display: inline-block; margin-right: 4px; width: 50%;">rating</div>
  <input type="radio" class="s-cbox" name="cbox_asc_rating_sort">asc</input>
  <input type="radio" class="s-cbox" name="cbox_asc_rating_sort">des</input>
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
