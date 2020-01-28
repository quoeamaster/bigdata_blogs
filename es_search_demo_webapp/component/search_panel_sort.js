Vue.component('s-sort-query', {
  data: function() {
    return {
      publish_date: 'desc',
      average_rating: 'desc'
    };
  },
  methods: {
    runSearch: function () {
      let qC = this.addSortCriteria('publish_date', this.publish_date);

      let _t = this.addSortCriteria('average_rating', this.average_rating);
      if (_t !== '') {
        if (qC !== '') { qC+=',' }
        qC += _t;
      }
      // add a criteria where the books returned MUST have a non zero average_rating
      let q = '{"query": { "range": { "average_rating": { "gt": 0 }}}}';
      console.log(q);
      console.log(qC);
      window.eventBus.$emit('on-query-request', { 'sort': qC, 'query': q });
    },
    addSortCriteria: function (fieldname, sOrder) {
      let c = '';
      if (fieldname && sOrder) {
        c = ''+fieldname+':'+sOrder+''
      }
      return c;
    }

  },
  template: `
<div class="s-accordion-detail-container s-separator">
  <div class="s-caption-detailed" style="display: inline-block; margin-right: 4px; width: 50%;">publish date</div>
  <input v-model="publish_date" value="asc" type="radio" class="s-cbox" name="cbox_asc_date_sort">asc</input>
  <input v-model="publish_date" value='desc' type="radio" class="s-cbox" name="cbox_asc_date_sort">des</input>
  <br/>
  <div class="s-caption-detailed" style="display: inline-block; margin-right: 4px; width: 50%;">rating</div>
  <input v-model="average_rating" value="asc" type="radio" class="s-cbox" name="cbox_asc_rating_sort">asc</input>
  <input v-model="average_rating" value="desc" type="radio" class="s-cbox" name="cbox_asc_rating_sort">des</input>
  
  <div class="s-full-button cursor-pointer" v-on:click="runSearch()">search</div>
</div>
  `
});
