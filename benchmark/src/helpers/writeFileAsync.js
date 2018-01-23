"use strict";

var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

function mkdirpAsync(filepath) {
  return new Promise(function (resolve, reject) {
    mkdirp(path.dirname(filepath), function (err) {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

function writeFileAsync(path, data, options) {
  return mkdirpAsync(path).then(function () {
    return new Promise(function (resolve, reject) {
      fs.writeFile(path, data, options, function (err) {
        if (!err) {
          resolve();
        } else {
          reject(err);
        }
      });
    });
  });
}

module.exports = writeFileAsync;
