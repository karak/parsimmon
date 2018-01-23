"use strict"

suite("Parsimmon.or", function () {
  suite("a or b", function () {
    var p = Parsimmon.string("a").or(Parsimmon.string("b"));

    test("parse \"abcdefghijklmnopqrstuvwxyz\"", function () {
      return printBenchmark(this, function () {
        p.parse("abcdefghijklmnopqrstuvwxyz");
      });
    });

    test("parse \"a\"", function () {
      return printBenchmark(this, function () {
        p.parse("a");
      });
    });

    test("parse \"b\"", function () {
      return printBenchmark(this, function () {
        p.parse("b");
      });
    });
  });
});
