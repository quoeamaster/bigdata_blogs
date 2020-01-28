Vue.component('content-container', {
  props: ['store'],
  mounted: function() {
    let inst = this;
    window.eventBus.$on('on-query-request', function (data) {
      let q = data.query;
      inst.runQuery(q);
    });
  },
  methods: {
    runQuery: function (q) {
      let inst = this;
      this.getESConnection().search({
        index: 'google_book_demo',
        body: q,
        filterPath: 'hits.total.value,hits.hits._source'
      }).then(function (data) {
        inst.results = data;
      });
    },
    getESConnection: function () {
      if (!this.esConnection) {
        this.esConnection = new jQuery.es.Client({hosts: ["http://localhost:9200"]});
      }
      return this.esConnection;
    }

  },
  data: function() {
    return {
      esConnection: null,
      /* TODO: testing data
      results: {
        "hits": {
          "total": {"value": 275},
          "hits": [{
            "_source" : {
              "search_category" : "programming language",
              "language" : "en",
              "name" : "React for Real",
              "image" : "http://books.google.com/books/content?id=Je7LtAEACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
              "desc" : "When traditional web development techniques don't cut it, try React. Use React to create highly interactive web pages faster and with fewer errors. With a little JavaScript experience under your belt, you'll be up and running in no time creating dynamic web applications. Craft isolated components that make your apps easier to develop and maintain, with plenty of guidance on best practices. Set up automated tests, and make pages render fast for your users. See how to use your React skills to integrate with other front-end technologies when needed. Dive right into React by defining components, the basic building blocks of a React application. Integrate modern JavaScript language features such as classes and arrow functions in your app. Analyze the relationships in your data to isolate state, and sync the data model with what your users see. Once you're familiar with how a React application works, organize your code base with modules. Configure a production build and deliver your app as efficiently as possible with Webpack. Master testing with React-specific advice and tools to catch the most bugs with the least amount of code. Learn the basics of the Redux library. Define actions and manage an immutable central state with reducers, then connect Redux to your React components to build even larger and more complex interfaces. Package your React code as a standalone widget so anyone can use it in their own applications. Reuse existing JavaScript code in your React components, and build a new React view on top of an existing data model shared with a legacy application. When you finish this book, you'll be well on your way to solving your front-end problems with React. What You Need: Node.js 6.x or later, and a modern web browser.",
              "print_type" : "BOOK",
              "authors" : [
                "Ludovico Fischer",
                "fake author - luka"
              ],
              "publish_date" : "2017-09-16T00:00:00",
              "isbn10" : "1680502638",
              "isbn13" : "9781680502633",
              "book_category" : [
                "Application software"
              ],
              "average_rating" : 0.0,
              "ratings_count" : 0,
              "pages" : 120
            }
          },{
            "_source" : {
              "search_category" : "programming language",
              "language" : "en",
              "name" : "Learn React Hooks",
              "publisher" : "Packt Publishing Ltd",
              "image" : "http://books.google.com/books/content?id=Tkm4DwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
              "desc" : "Create large-scale web applications with code that is extensible and easy to understand using React Hooks Key Features Explore effective strategies for migrating your state management from Redux and MobX to React Hooks Integrate Hooks with React features such as Context and Suspense to add advanced functionality to your web apps Create complex applications by combining multiple hooks Book Description React Hooks revolutionize how you manage state and effects in your web applications. They enable you to build simple and concise React.js applications, along with helping you avoid using wrapper components in your applications, making it easy to refactor code. This React book starts by introducing you to React Hooks. You will then get to grips with building a complex UI in React while keeping the code simple and extensible. Next, you will quickly move on to building your first applications with React Hooks. In the next few chapters, the book delves into various Hooks, including the State and Effect Hooks. After covering State Hooks and understanding how to use them, you will focus on the capabilities of Effect Hooks for adding advanced functionality to React apps. You will later explore the Suspense and Context APIs and how they can be used with Hooks. Toward the concluding chapters, you will learn how to integrate Redux and MobX with React Hooks. Finally, the book will help you develop the skill of migrating your existing React class components, and Redux and MobX web applications to Hooks. By the end of this book, you will be well-versed in building your own custom Hooks and effectively refactoring your React applications. What you will learn Understand the fundamentals of React Hooks and how they modernize state management in React apps Build your own custom Hooks and learn how to test them Use community Hooks for implementing responsive design and more Learn the limitations of Hooks and what you should and shouldn’t use them for Get to grips with implementing React context using Hooks Refactor your React-based web application, replacing existing React class components with Hooks Use state management solutions such as Redux and MobX with React Hooks Who this book is for This book is for React developers who want to learn how to build applications with Hooks. Developers who are looking to migrate to React for its advanced feature set and capabilities will also find the book useful.",
              "print_type" : "BOOK",
              "authors" : [
                "Daniel Bugl"
              ],
              "publish_date" : "2019-10-18T00:00:00",
              "isbn13" : "9781838640514",
              "isbn10" : "1838640517",
              "book_category" : [
                "Computers"
              ],
              "average_rating" : 4.0,
              "ratings_count" : 345,
              "pages" : 426
            }
          }]
        }
      }
      */
      results: {}
    };
  },
  template: `
<div class="c-container">
  <div class="c-left-panel">
    <search-panel v-bind:store="store"></search-panel>
  </div>
  <div class="c-right-panel">
    <result-panel v-bind:store="store" v-bind:results="results"></result-panel>
  </div>
</div>
  `
});
