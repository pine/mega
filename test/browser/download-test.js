var _ = require('lodash');
var mega = require('../..');
var conf = require('./conf');
var blobUtil = require('blob-util');

var TestFile1_txt = require('../files/TestFile1_txt');
var TestFile2_dat = require('../files/TestFile2_dat');

function arrayBufferToString (buff, cb) {
  blobUtil.arrayBufferToBlob(buff).then(function (blob) {
    blobUtil.blobToBinaryString(blob).then(function (str) {
      cb(null, str);
    }, function (err) {
      cb(err, null);
    });
  }, function (err) {
    cb(err, null);
  });
}

function isBufferEquals (buf1, buf2) {
  if (buf1.length !== buf2.length) {
    throw [buf1.length, buf2.length];
    return false;
  }
  
  for (var i = 0; i < buf1.length; ++i) {
    if (buf1[i] !== buf2[i]) {
      return false;
    }
  }
  
  return true;
}

describe('Download test', function () {
  var storage;
  
  before(function (done) {
    storage = mega({
      email: conf.email,
      password: conf.password,
      autoload: true
    }, done);
  });
  
  it('should download a text file', function (done) {
    var file1 = _.find(storage.root.children,
      function (x) { return x.name === 'TestFile1.txt'; });
    
    expect(file1).to.be.ok;
    
    file1.download(function (err, data) {
      try {
        expect(err).to.not.be.ok;
        
        arrayBufferToString(data, function (err, str) {
          try {
            expect(err).to.not.be.ok;
            expect(str).to.equal(TestFile1_txt);
            done();
          }
          
          catch (e) {
            done(e);
          }
        });
      }
      
      catch (e) {
        done(e);
      }
    });
  });
  
  it('should download a binary file', function (done) {
    var file2 = _.find(storage.root.children,
      function (x) { return x.name === 'TestFile2.dat'; });
    
    expect(file2).to.be.ok;
    
    file2.download(function (err, data) {
      try {
        expect(err).to.not.be.ok;
        expect(isBufferEquals(data, TestFile2_dat)).to.be.true;
        
        done();
      }
      
      catch (e) {
        done(e);
      }
    });
  });
});