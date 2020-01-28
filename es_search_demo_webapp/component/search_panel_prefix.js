Vue.component('s-prefix-query', {
  data: function() {
    return {
      desc: ''
    };
  },
  methods: {
    runSearch: function () {
      let q = {"query": {
        "match_phrase_prefix": {
          "desc": this.desc
        }
      }};
      console.log(q);
      window.eventBus.$emit('on-query-request', { 'query': q });
    }

  },
  template: `
<div class="s-accordion-detail-container s-main-closer">
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-full-text" v-model="desc">
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
