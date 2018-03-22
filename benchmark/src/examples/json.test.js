"use strict"

suite("examples", function () {
  test("json", function () {
    return printBenchmark(this, function () {
      require("../../../examples/json");
    });
  });
});
