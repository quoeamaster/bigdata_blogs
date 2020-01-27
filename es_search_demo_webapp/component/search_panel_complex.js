Vue.component('s-complex-query', {
  methods: {
    runSearch: function () {
      console.log('run a search - complex query')
    }
  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">book name</div>
  <input type="text" class="s-full-text">
  <div class="s-caption-detailed">publisher name</div>
  <input type="text" class="s-full-text">
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-full-text">
  <div class="s-caption-detailed">number of pages</div>
  <input type="text" class="s-full-text s-30-text">
  <input type="checkbox" class="s-cbox" name="cbox_pages_complex">more than?</input>
  <div class="s-caption-detailed">publish date</div>
  <div class="s-caption-detailed" style="margin-top: 2px; width: 20%; display: inline-block;">from</div>
  <input type="text" class="s-full-text s-70-text" placeholder="yyyy-mm-dd">
  <div class="s-caption-detailed" style="margin-top: 6px; width: 20%; display: inline-block;">to</div>
  <input type="text" class="s-full-text s-70-text" placeholder="yyyy-mm-dd">
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
