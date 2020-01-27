Vue.component('search-panel', {
  props: ['store'],
  data: function() {
    return {
      chosenQType: ''
    };
  },
  methods: {
    onAccordionClick: function (data) {
      if (this.chosenQType === data.queryType) {
        // reset
        this.chosenQType = '';
      } else {
        this.chosenQType = data.queryType;
      }
    },
    shouldShow: function (qType) {
      if (qType && qType === this.chosenQType) {
        return {
          'show-block': true,
          'show-hidden': false
        }
      } else {
        return {
          'show-block': false,
          'show-hidden': true
        }
      }
    }

  },
  template: `
<!-- 40%; -->
<div style="height: 100%; overflow: scroll;">
  <div style="padding-top: 12px; margin-left: 16px; margin-right: 16px; overflow: hidden;">
    <!-- 1st row -->
    <div class="s-main-container s-main-title s-separator">
      <div style="text-align: center;">Advance Search</div>
    </div>
    <search-panel-accordion v-on:onAccordionClick="onAccordionClick" 
      qType="simple" 
      iconClass="fas,fa-book" caption="simple query"></search-panel-accordion>
    <s-simple-query v-bind:class="shouldShow('simple')"></s-simple-query>
    
    <search-panel-accordion v-on:onAccordionClick="onAccordionClick" 
      qType="complex"  
      iconClass="fas,fa-bong" caption="complex query"></search-panel-accordion>
    <s-complex-query v-bind:class="shouldShow('complex')"></s-complex-query>
    
    <search-panel-accordion v-on:onAccordionClick="onAccordionClick" 
      qType="should"  
      iconClass="fas,fa-bowling-ball" caption="nice to have conditions"></search-panel-accordion>
    <s-should-query v-bind:class="shouldShow('should')"></s-should-query>
    
    <search-panel-accordion v-on:onAccordionClick="onAccordionClick" 
      qType="sort"  
      iconClass="fas,fa-bullhorn" caption="sorting"></search-panel-accordion>
    <s-sort-query v-bind:class="shouldShow('sort')"></s-sort-query>
    
    <search-panel-accordion v-on:onAccordionClick="onAccordionClick" 
      qType="prefix"  
      iconClass="fas,fa-carrot" caption="prefix search / suggestion"></search-panel-accordion>
    <s-prefix-query v-bind:class="shouldShow('prefix')"></s-prefix-query>
    
    <!-- s-main-closer -->
  </div>
</div>
  `
});


Vue.component('search-panel-accordion', {
  props: ['caption', 'iconClass', 'qType'],
  methods: {
    getIconClass: function () {
      let _css = {};
      let classParts = this.iconClass.split(',');
      classParts.forEach(function (item) {
        _css[item] = true;
      });
      return _css;
    },
    isChosen: function () {
      // TODO: changes when this is a chosen accordion
      // 's-accordion-chosen' vs 's-accordion-norm'
      return {
        's-accordion-norm': true
      };
    },
    raiseEvent: function () {
      this.$emit('onAccordionClick',  {
        queryType: this.qType
      });
    }
  },
  template: `
<div class="s-separator s-accordion cursor-pointer" v-bind:class="isChosen()">
  <div style="padding-left: 20px; padding-right: 20px;" v-on:click="raiseEvent()">
    <i v-bind:class="getIconClass()" style="color: #666; font-size: 1em; padding-right: 4px;"></i>
    <span class="h-caption">{{caption}}</span>
    <span class="float-right">
      <i class="fas fa-plus cursor-pointer" style="font-size: 0.8em; padding-top: 8px;"></i>
    </span>
  </div>
</div>
  `
});

/* RANDOM icons

  <i class="fab fa-buffer"></i>
  <i class="fas fa-cat"></i>
  <i class="fas fa-chart-line"></i>
*/
