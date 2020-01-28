Vue.component('s-simple-query', {
  data: function() {
    return {
      query: '',
      fields: []
    };
  },
  methods: {
    runSearch: function () {
      let q = {
        "query": {
          "multi_match": {
            "query": this.query,
            "fields": this.fields
          }
        }
      };
      console.log(q);
      window.eventBus.$emit('on-query-request', { 'query': q });
    }
  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">query</div>
  <input type="text" class="s-full-text" v-model="query">
  <div class="s-caption-detailed">search against which fields?</div>
  <div style="display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around;">
    <input v-model="fields" type="checkbox" id="cbox_fields_simple" style="flex-grow: 1;" class="s-cbox" value="name">book name</input>
    <input v-model="fields" type="checkbox" id="cbox_fields_simple" style="flex-grow: 1;" class="s-cbox" value="publisher">publisher name</input>
    <input v-model="fields" type="checkbox" id="cbox_fields_simple" style="flex-grow: 2;" class="s-cbox" value="desc">book description</input> 
  </div>
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
