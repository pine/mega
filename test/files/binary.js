var fs = require('fs');
var _ = require('lodash');
var util = require('util');

var data = fs.readFileSync('TestFile2.dat');

_.each(data, function (x, i) {
  util.print('0x' + ('00' + x.toString(16)).slice(-2) + ', ');
  if (i % 16 === 15) {
    console.log();
  }
});