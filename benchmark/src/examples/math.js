"use strict"

suite("examples", function () {
  test("math", function () {
    return printBenchmark(this, function () {
      require("../../../examples/math");
    });
  });
});
