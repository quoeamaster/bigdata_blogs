Vue.component('s-simple-query', {
  methods: {
    runSearch: function () {
      console.log('run a search - simple query')
    }
  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">query</div>
  <input type="text" class="s-full-text">
  <div class="s-caption-detailed">search against which fields?</div>
  <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;">
    <input type="checkbox" name="cbox_fields_simple" style="flex-grow: 1;" class="s-cbox" value="name">book name</input>
    <input type="checkbox" name="cbox_fields_simple" style="flex-grow: 1;" class="s-cbox" value="publisher">publisher name</input>
    <input type="checkbox" name="cbox_fields_simple" style="flex-grow: 2;" class="s-cbox" value="desc">book description</input> 
  </div>
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
