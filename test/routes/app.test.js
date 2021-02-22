//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Main App', () => {
  describe('/ GET main route', () => {
    it('should find this route', (done) => {
      chai
        .request(server)
        .get('/api/v1/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should 404 any undefined route', (done) => {
      chai
        .request(server)
        .get('/foo/bar')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
