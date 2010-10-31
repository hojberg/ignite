(function (global, selectorEngine) {
  
  var ignite = {}, _funcs = [], $DOM;
  
  var is = function (type, value) {
    return typeof value === type
  };
  
  if (!is("undefined", selectorEngine)) {
    $DOM = selectorEngine; 
  }
  else {
    $DOM = function (selector) {
      return window.document.querySelectorAll(selector);
    };
  }
  
  ignite.add = function (v, func) {
    var init = v;
    if (is('function', v) && is('undefined', func)) {
      init = {condition: true, func: v};
    }
    else if (is('function', v) && is('function', func)) {
      init = {condition: v, func: func};
    }
    else if (is('boolean', v)) {
      init = {condition: v, func: func};        
    }
    else if (is('string', v) && is('function', func)) {
      init = {
        condition: function () { return $DOM(v).length > 0; },
        func: func
      };
    }
    
    _funcs.push(init);
  };
    
  ignite.spark = function () {
    var i, f, condition, l = _funcs.length;
    
    for (i = 0 ; i < l ; i++) {
      f = _funcs[i];
      condition = (is("function", f.condition) ? f.condition() : f.condition);
      if (condition) {
        f.func();
      }
    }      
  };
  
  window[global] = ignite;

}("ignite"));