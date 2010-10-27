(function (global) {
  
  var _funcs = [];
  var $ = function (selector) {
    return window.document.querySelectorAll(selector);
  };
  
  var ignite = {
    
    add: function (v, f) {
      var o = v;
      if (typeof v === 'function' && typeof f === "undefined") {
        o = {condition: true, func: v};
      }
      else if (typeof v === 'function' && typeof f === "function") {
        o = {condition: v, func: f};
      }
      else if (typeof v === 'boolean') {
        o = {condition: v, func: f};        
      }
      else if (typeof v === 'string' && typeof f === 'function') {
        o = {
          condition: function () {
            return $(v).length > 0;
          },
          func: f
        };
      }
      
      _funcs.push(o);
    },
    
    spark: function () {
      var i, f, condition, l = _funcs.length;
      
      for (i = 0 ; i < l ; i++) {
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