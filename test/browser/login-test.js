var mega = require('../..');
var conf = require('./conf');

describe('Login test', function () {
  it('should login succeeded', function (done) {
    var storage = mega({
      email: conf.email,
      password: conf.password,
      autoload: false
    }, function (err) {
      try {
        expect(err).to.not.be.ok;
        expect(storage.email).to.equal(conf.email);
        done();
      }
      
      catch (e) {
        done(err);
      }
    });
  });
  
  it('should login failed', function (done) {
    mega({
      email: conf.email,
      password: 'invalid_password',
      autoload: false
    }, function (err) {
      try {
        expect(err).to.be.ok;
        done();
      }
      
      catch (e) {
        done(e);
      }
    });
  });
});