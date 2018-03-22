"use strict"

suite("examples", function () {
  test("python-ish", function () {
    return printBenchmark(this, function () {
      require("../../../examples/python-ish");
    });
  });
});
