"use strict";

var path = require("path");
var Benchmark = require("benchmark");
var writeFileAsync = require("./writeFileAsync");

/** Timeout duration */
var TIMEOUT_MILLISECONDS = 1000;

function runSingle(fn) {
  return new Promise(function (resolve, reject) {
    var bench = new Benchmark({
      fn: fn,
      onComplete: function () {
        resolve(this.stats);
      },
      onError: reject,
      onAbort: reject,
    });

    bench.run({
      maxTime: (TIMEOUT_MILLISECONDS * 0.001 /* sec */),
      async: true
    });
  });
}

function makeFilepath(testContext) {
  var testTitle = testContext.test.title;
  var titles = [testTitle];
  for (var suite = testContext.test.parent; suite && !suite.root; suite = suite.parent) {
    titles.push(suite.title);
  }
  titles.reverse();
  return path.join(__dirname, "../../results/", path.join.apply(this, titles), "perf.json");
}

function printResult(testContext, result) {
  var data = JSON.stringify(result);
  var absolutePath = makeFilepath(testContext);

  return writeFileAsync(absolutePath, data);
}

/**
 * Run a benchmark and print the results.
 *
 * @param {*} testContext - context object of mocha.
 * @param {Function} fn - target function
 * @returns {Promise}
 */
function printBenchmark(testContext, fn) {
  return runSingle(fn)
    .then(function (result) {
      return printResult(testContext, result);
    });
}

module.exports = printBenchmark;
