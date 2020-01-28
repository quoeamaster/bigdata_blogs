Vue.component('s-complex-query', {
  data: function() {
    return {
      name: '',
      publisher: '',
      desc: '',
      pages: '',
      pages_more_than: false,
      publish_date_from: '',
      publish_date_to: ''
    };
  },
  methods: {
    runSearch: function () {
      // add criteria bits by bits
      let qC = this.addMustMatchCriteria('name', this.name, false, false);

      let _t = this.addMustMatchCriteria('publisher', this.publisher, false, false);
      if (_t !== '' && qC !== '') { qC += ',' }
      qC += _t;

      _t = this.addMustMatchCriteria('desc', this.desc, false, false);
      if (_t !== '') { qC += ',' }
      qC += _t;

      _t = this.addPagesWivRange('pages', this.pages, this.pages_more_than);
      if (_t !== '') { qC += ',' }
      qC += _t;

      _t = this.addFilterRangeCriteria('publish_date', this.publish_date_from, this.publish_date_to);
      if (_t !== '') { qC += ',' }
      qC += _t;

      let q = '{ "query": { "bool": { "must": [' + qC + '] }}}';
      console.log(q);
      window.eventBus.$emit('on-query-request', { 'query': q });
    },
    addMustMatchCriteria: function (fieldname, val, isInt, isFloat) {
      let c = '';
      if (fieldname && val) {
        if (isInt) {
          c = '{ "match": { "' + fieldname + '": ' + val + '}}';
        } else if (isFloat) {
          c = '{ "match": { "' + fieldname + '": ' + val + '}}';
        } else {
          c = '{ "match": { "' + fieldname + '": "' + val + '"}}';
        }
      }
      return c;
    },
    addPagesWivRange: function(fieldname, val, isMoreThan) {
      let c='';
      if (fieldname && val) {
        if (isMoreThan === true) {
          c = '{ "range": { "'+fieldname+'": { "gte": '+val+' } } }';
        } else {
          c = '{ "match": { "'+fieldname+'": '+val+' } }';
        }
      }
      return c;
    },

    addFilterRangeCriteria: function (fieldname, fromVal, toVal) {
      let c = '';
      if (fieldname && (fromVal || toVal)) {
        if (fromVal && toVal) {
          // a. from , to OK
          c = '{ "range": { "' + fieldname + '": { "gte": "' + fromVal + '", "lte": "' + toVal + '" } } }';
        } else if (fromVal) {
          // b. from only
          c = '{ "range": { "' + fieldname + '": { "gte": "' + fromVal + '" } } }';
        } else if (toVal) {
          // c. to only
          c = '{ "range": { "' + fieldname + '": { "lte": "' + toVal + '" } } }';
        }
      }
      return c;
    }

  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed">book name</div>
  <input type="text" class="s-full-text" v-model="name">
  <div class="s-caption-detailed">publisher name</div>
  <input type="text" class="s-full-text" v-model="publisher">
  <div class="s-caption-detailed">book description</div>
  <input type="text" class="s-full-text" v-model="desc">
  <div class="s-caption-detailed">number of pages</div>
  <input type="text" class="s-full-text s-30-text" v-model="pages">
  <input type="checkbox" v-model="pages_more_than" class="s-cbox" id="cbox_pages_complex">more than?</input>
  
  <div class="s-caption-detailed">publish date</div>
  <div class="s-caption-detailed" style="margin-top: 2px; width: 20%; display: inline-block;">from</div>
  <input type="text" class="s-full-text s-70-text" placeholder="yyyy-mm-dd" v-model="publish_date_from">
  <div class="s-caption-detailed" style="margin-top: 6px; width: 20%; display: inline-block;">to</div>
  <input type="text" class="s-full-text s-70-text" placeholder="yyyy-mm-dd" v-model="publish_date_to">
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
