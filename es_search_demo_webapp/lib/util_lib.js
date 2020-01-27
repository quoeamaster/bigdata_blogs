/**
 * simple cache object
 * @param size
 * @returns {{add: add, reset: reset}}
 * @constructor
 */
let CacheObject = function (size) {
  let _cache = {};
  let _capacity = size;
  let _size = 0;

  /**
   * simple method to preload an image
   * @param filepath
   */
  function _preloadImage(filepath) {
    let imgObject = new Image();
    imgObject.src = filepath;
  }

  return {
    reset: function () {
      _cache = {};
    },
    add: function (filepath, key) {
      let _key = filepath;
      if (key) {
        _key = key;
      }
      if (!_cache[_key]) {
        if ((_size + 1) >= _capacity) {
          // remove the 1st element in the _cache
          let firstKey = Object.keys(_cache)[0];
          delete _cache[firstKey];
        }
        let _img = _preloadImage(filepath);
        _cache[_key] = _img;
        _size++;
      } // end -- if (cache[key])
    }

  };
};
