"use strict"

suite("examples", function () {
  test("linter", function () {
    return printBenchmark(this, function () {
      require("../../../examples/linter");
    });
  });
});
