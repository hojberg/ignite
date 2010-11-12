test("ignite api should exists ", function() {
  ok(typeof ignite !== 'undefined', "ignite global exists");
  ok(typeof ignite.spark === 'function', "ignite.spark is a function");
  ok(typeof ignite.on === 'function', "ignite.on is a function");
  ok(typeof ignite.on(function () {}) === 'function', "ignite.on should return a function");
});

test("should execute inits", function() {
  var initsExecuted = [];
  
  ignite.on("#simpleselector", function () {
    initsExecuted.push("simple selector");
  });
  
  ignite.on("#my .advanced .selector", function () {
    initsExecuted.push("advanced selector");
  });
  
  ignite.on(true, function () {
    initsExecuted.push("boolean");
  });
  
  ignite.on(function () {
    initsExecuted.push("just function");
  });
  
  ignite.on(function () { return true; }, function () {
    initsExecuted.push("function");
  });
  
  ignite.on({condition: true, func: function () {
    initsExecuted.push("object");
  }});
  
  ignite.spark();

  ok(initsExecuted.indexOf("simple selector")   !== -1, "simple selector was executed");  
  ok(initsExecuted.indexOf("advanced selector") !== -1, "advanced selector was executed");
  ok(initsExecuted.indexOf("boolean")           !== -1, "boolean was executed");
  ok(initsExecuted.indexOf("just function")     !== -1, "just function was executed");
  ok(initsExecuted.indexOf("function")          !== -1, "function as condition was executed");
  ok(initsExecuted.indexOf("object")            !== -1, "object was executed");

});

test("should not execute inits", function() {
  var initsExecuted = [];
  
  ignite.on("#my .selector_that_is_not_there", function () {
    initsExecuted.push("selector");
  });
  
  ignite.on(false, function () {
    initsExecuted.push("boolean");
  });
  
  ignite.on({condition: false, func: function () {
    initsExecuted.push("object");
  }});
  
  ignite.spark();
  
  ok(initsExecuted.indexOf("selector")  === -1, "selector was executed");
  ok(initsExecuted.indexOf("boolean")   === -1, "boolean was executed");
  ok(initsExecuted.indexOf("object")    === -1, "object was executed");

});