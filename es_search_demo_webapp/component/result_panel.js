Vue.component('result-panel', {
  props: ['store', 'results', 'random'],
  watch: {
    result: function (val) {
      console.log('new data from parent and es');
    }
  },
  data: function() {
    return {

    };
  },
  methods: {
    getResults: function () {
      if (this.results && this.results.hits && this.results.hits.hits) {
        return this.results.hits.hits;
      } else {
        return {"hits": {"hits": []}}
      }
    }
  },
  template: `
<div style="overflow: scroll; height: 100%;">
  <div class="r-container" style="overflow: hidden;">
    <r-card v-for="r in getResults()" v-bind:result="r" ></r-card>
  </div>
  <div class="show-block">{{random}}</div>
</div>
  `
});

Vue.component('r-card', {
  props: ['result'],
  data: function() {
    return {
      numStarNonColored: 0,
      shouldShowAllDesc: false
    };
  },
  methods: {
    getSrc: function() {
      if (this.result && this.result['_source']) {
        return this.result['_source'];
      } else {
        return {};
      }
    },
    getName: function() {
      let n = this.getSrc()['name'];
      if (n) {
        return n;
      } else {
        return '';
      }
    },
    getImage: function () {
      return this.getSrc()['image'];
    },
    getPublisher: function () {
      if (this.getSrc()['publisher']) {
        return ' - ' + this.getSrc()['publisher'];
      } else {
        return '';
      }
    },
    getAuthors: function () {
      if (this.getSrc()['authors']) {
        let a = '';
        let aList = this.getSrc()['authors'];
        aList.forEach(function (item, idx) {
          if (idx > 0) {
            a += ', ';
          }
          a += item;
        });
        return a;
      } else {
        return '';
      }
    },
    getPublishDate: function () {
      if (this.getSrc()['publish_date']) {
        let d = this.getSrc()['publish_date'];
        let dParts = d.split('T');
        return dParts[0];
      } else {
        return ' - ';
      }
    },
    getRatingCnt: function () {
      if (this.getSrc()['ratings_count']) {
        let c = parseInt(this.getSrc()['ratings_count'], 10);
        if (c <= 0) {
          return 'no ratings yet';
        } else {
          return c + ' ratings';
        }
      } else {
        return 'no ratings yet';
      }
    },
    getRatingStarColored: function () {
      let r = this.getSrc()['average_rating'];
      if (r) {
        let f = parseFloat(r);
        if (f <= 0.0) {
          this.numStarNonColored = 5;
          return 0;
        } else {
          let i = parseInt(f+'', 10);
          this.numStarNonColored = 5 - i;
          return i;
        }
      } else {
        this.numStarNonColored = 5;
        return 0;
      }
    },
    getDesc: function () {
      let d = this.getSrc()['desc'];
      if (d) {
        return d;
      } else {
        return 'no book description available'
      }
    },

    showAllDesc: function () {
      this.shouldShowAllDesc = !this.shouldShowAllDesc;
    },
    getClassForDesc: function () {
      if (this.shouldShowAllDesc) {
        return {
          'r-desc-container-limited': false,
          'r-desc-container-auto': true
        };
      } else {
        return {
          'r-desc-container-limited': true,
          'r-desc-container-auto': false
        };
      }
    },
    getClassForDittle: function () {
      if (this.shouldShowAllDesc) {
        return {
          'show-block': false,
          'show-hidden': true
        };
      } else {
        return {
          'show-block': true,
          'show-hidden': false
        };
      }
    },
    getPages: function () {
      let p = this.getSrc()['pages'];
      if (p) {
        return p;
      } else {
        return " - ";
      }
    },
    getIsbn: function () {
      let c = '';
      let i = this.getSrc()['isbn10'];
      if (i) {
        c += i;
      }
      i = this.getSrc()['isbn13'];
      if (i) {
        c += ' or ' + i;
      }
      // not available??
      if (c === '') {
        c = "not available"
      }
      return c;
    },

    shouldShow: function () {
      if (this.result.hasOwnProperty('_source')) {
        return {
          'show-hidden': false,
          'show-block': true
        };
      } else {
        return {
          'show-hidden': true,
          'show-block': false
        };
      }
    }
  },
  template: `
<div class="r-card-container" v-bind:class="shouldShow()">
  <div style="display: flex; flex-direction: row;">
    <div style="flex-basis: 200px; flex-grow: 0; margin-right: 8px;">
      <img v-bind:src="getImage()" width="100%;" style="border-radius: 6px; border: 1px solid #eee;"  >
    </div>
    <div style="flex-basis: 450px; flex-grow: 1; ">
      <div class="r-card-title" style="margin-bottom: 4px;">
        {{getName()}}{{getPublisher()}}
      </div>
      <div>written by <span class="r-card-caption">{{getAuthors()}}</span></div>
      <div>published on <span class="r-card-caption">{{getPublishDate()}}</span></div>
      <div>
        <i class="fas fa-star" style="color: #FF9800;" v-for="i in getRatingStarColored()"></i>
        <i class="far fa-star" style="color: #FF9800;" v-for="i in numStarNonColored"></i>
        <span style="margin-left: 8px;" class="r-card-caption">{{getRatingCnt()}}</span>
      </div>
      <div class="s-separator" style="height: 12px; margin-bottom: 4px;"></div>
      <div style="text-align: justify; z-index: 1;" v-bind:class="getClassForDesc()">
        {{getDesc()}}
      </div>
      <div class="float-right" style="color: #FF9800;">
        <i class="fas fa-ellipsis-h cursor-pointer" v-bind:class="getClassForDittle()" v-on:click="showAllDesc()"></i>
      </div>
      <div class="s-separator" style="height: 12px; margin-top: 8px; margin-bottom: 4px;"></div>
      <div>pages <span class="r-card-caption">{{getPages()}}</span></div>
      <div>isbn <span class="r-card-caption">{{getIsbn()}}</span></div>
      
    </div>
  </div>
</div>
  `
});
