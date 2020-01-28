Vue.component('s-should-query', {
  data: function() {
    return {
      name: '',
      name_should_match: false,
      desc: '',
      desc_should_match: false
    };
  },
  methods: {
    runSearch: function () {
      let qC = '';
      if (this.name_should_match === true) {
        qC += this.addShouldMatchCriteria('name', this.name);
      }
      let _t = (this.desc_should_match === true)?this.addShouldMatchCriteria('desc', this.desc):'';
      if (_t !== '') {
        if (qC !== '') {
          qC += ',';
        }
        qC += _t;
      }
      let q = '{ "query": { "bool": { "should": [' + qC + ']}}}';
      console.log(q);
      window.eventBus.$emit('on-query-request', { 'query': q });
    },
    addShouldMatchCriteria: function (fieldname, val) {
      let c = '';
      if (fieldname && val) {
        c = '{ "match": { "'+fieldname+'": "'+val+'" } }';
      }
      return c;
    }

  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">book name</div>
  <input type="text" class="s-50-text s-full-text" v-model="name">
  <input v-model='name_should_match' type="checkbox" class="s-cbox" name="cbox_match_name_should">nice to match?</input>
  
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-50-text s-full-text" v-model="desc">
  <input v-model='desc_should_match' type="checkbox" class="s-cbox" name="cbox_match_desc_should">nice to match?</input>
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
