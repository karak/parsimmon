"use strict"

suite("examples", function () {
  test("seqobj", function () {
    return printBenchmark(this, function () {
      require("../../../examples/seqobj");
    });
  });
});
