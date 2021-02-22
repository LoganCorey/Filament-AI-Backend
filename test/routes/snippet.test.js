//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();
chai.use(chaiHttp);

describe('Snippet routes', () => {
  describe('Test All routes in snippet', () => {
    let token;
    let createdSnippetId;
    before((done) => {
      // get token, should probably revisit this
      let user = {
        email: 'logan@coldiron.ca',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/user/login')
        .send(user)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should get all snippets', (done) => {
      chai
        .request(server)
        .get('/api/v1/snippet')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('snippets');
          done();
        });
    });
    it('should get one snippet', (done) => {
      chai
        .request(server)
        .get('/api/v1/snippet/1')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('snippet');
          done();
        });
    });

    it('should create a snippet', (done) => {
      let tag = {
        snippet:
          'Here lies the greatest snippeweft ever crffeeated eqwegrperiode!',
      };
      chai
        .request(server)
        .post('/api/v1/snippet')
        .send(tag)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('snippet');
          createdSnippetId = res.body.snippet.id;
        done();
        });
    });
    it('should delete a snippet', (done) => {
        chai
          .request(server)
          .delete(`/api/v1/snippet/${createdSnippetId}`)
          .set({ Authorization: `Bearer ${token}` })
          .end((err, res) => {
            res.should.have.status(201);
            done();
          });
      });
  });
});
