var _ = require('lodash');
var mega = require('../..');
var conf = require('./conf');

describe('Reload test', function () {
  var storage;
  
  before(function (done) {
    storage = mega({
      email: conf.email,
      password: conf.password,
      autoload: false
    }, done);
  });
  
  it('should reload succeeded', function (done) {
    storage.reload(function (err) {
      try {
        expect(err).to.not.be.ok;
        
        expect(storage).to.contain.keys('files', 'root');
        expect(storage.root).to.contain.keys('name', 'nodeId', 'directory', 'children');
        expect(storage.root.directory).to.be.true;
        expect(storage.root.name).to.equal(storage.files[storage.root.nodeId].name);
        
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  
  it('should contain some folders and files', function (done) {
    storage.reload(function (err) {
      try {
        var folder1 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFolder1'; });
        var folder2 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFolder2'; });
        var folder3 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFolder3'; });
        
        expect(folder1).to.be.ok
          .and.have.property('directory', true);
        expect(folder2).to.be.ok
          .and.have.property('directory', true);
        expect(folder3).to.not.be.ok;
        
        var file1 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFile1.txt'; });
        var file2 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFile2.dat'; });
        var file3 = _.find(storage.root.children,
          function (x) { return x.name === 'TestFile3.dat'; });
        
        expect(file1).to.be.ok
          .and.have.property('directory', false);
        expect(file2).to.be.ok
          .and.have.property('directory', false);
        expect(file3).to.not.be.ok;
        
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});