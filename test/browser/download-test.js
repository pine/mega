var _ = require('lodash');
var mega = require('../..');
var conf = require('./conf');
var uint8 = require('uint8')
var blobUtil = require('blob-util');

var TestFile1_txt = require('../files/TestFile1_txt');

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

describe('Download test', function () {
  var storage;
  
  before(function (done) {
    storage = mega({
      email: conf.email,
      password: conf.password,
      autoload: true
    }, done);
  });
  
  it('should can download TestFile1.txt', function (done) {
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
});