var _ = require('lodash');
var mega = require('../..');
var conf = require('./conf');

describe('LoadAttributes test', function () {
  var storage;
  
  before(function (done) {
    storage = mega({
      email: conf.email,
      password: conf.password,
      autoload: true
    }, done);
  });
  
  it('should load a text file attributes', function (done) {
    var file1 = _.find(storage.root.children,
      function (x) { return x.name === 'TestFile1.txt'; });
    
    expect(file1).to.be.ok;
    
    var newFile = new mega.File({ h: file1.nodeId, key: file1.key }, storage);
    newFile.loadAttributes(function (err, attrs) {
      try {
        expect(err).to.not.be.ok;
        expect(attrs.name).to.equal(file1.name);
        expect(attrs.directory).to.equal(file1.directory);
        expect(attrs.size).to.equal(file1.size);
        
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});