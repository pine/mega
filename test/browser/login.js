var mega = require('../..');
var local = require('./local');

describe('Login test', function () {
  it('should login succeeded', function (done) {
    mega({
      email: local.email,
      password: local.password
    }, function (err) {
      try {
        expect(err).to.not.be.ok;
        done();
      }
      
      catch (e) {
        done(err);
      }
    });
  });
  
  it('should login failed', function (done) {
    mega({
      email: local.email,
      password: 'invalid_password'
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