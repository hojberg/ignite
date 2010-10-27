function (global) {
  
  var ignite = {
    
    var _funcs = [];
    var $ = function (selector) {
      return window.document.querySelectorAll(selector);
    };
    
    add: function (v, f) {
      var o = v;
      if (typeof v === 'function') o = {condition: true, func: v};
      if (typeof v === 'string' && typeof f === 'function') {
        o = {
          condition: function () {
            return $(v).length > 0;
          },
          func: f
        };
      }
      
      _funcs.push(o);
    },
    
    run: function () {
      var i, f, condition, l = _funcs.length;
      
      for(i = 0 ; i < l ; i++) {
        f = _funcs[i];
        condition = (typeof f.condition === 'function' ? f.condition() : f.condition);
        if (condition) {
          f.func();
        }
      }      
    }
    
  };
  
  window[global] = ignite;  
}("ignite"));