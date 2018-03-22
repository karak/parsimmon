"use strict";

var path = require("path");
var Benchmark = require("benchmark");
var median = require('median');
var writeFileAsync = require("./writeFileAsync");

/** Timeout duration */
var TIMEOUT_MILLISECONDS = 1000;

/**
 * @typedef Stats
 * @type {object}
 * @property {number} deviation - The sample standard deviation.
 * @property {number} mean - The sample arithmetic mean (secs).
 * @property {number} moe - The margin of error.
 * @property {number} rme - The relative margin of error (expressed as a percentage of the mean).
 * @property {Array<number>} sample - The array of sampled periods.
 * @property {number} sem - The standard error of the mean.
 * @property {number} variance - The sample variance.
 */

/**
 * run single function under benchmarking.
 *
 * @param {Function} fn - function to measure
 * @returns {Promise<Stats>}
 */
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
 * Get mean and median from Benchmark result.
 *
 * @param {Stats} stats - output stats of Benchmark#stats
 * @param {number} stats.mean
 * @param {Array<number>} stats.sample
 * @returns {object} mean and median
 */
function getResultToPrint(stats) {
  return {
    mean: stats.mean,
    median: median(stats.sample)
  };
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
    .then(getResultToPrint)
    .then(function (result) {
      return printResult(testContext, result);
    });
}

module.exports = printBenchmark;
