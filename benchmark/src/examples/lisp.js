"use strict"

suite("examples", function () {
  test("lisp", function () {
    return printBenchmark(this, function () {
      require("../../../examples/lisp");
    });
  });
});
