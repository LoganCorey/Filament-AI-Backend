//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();
chai.use(chaiHttp);

describe('Tag routes', () => {
  describe('Test All routes in tag', () => {
    let token;
    let createdTagId;
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
    it('should get all tags', (done) => {
      chai
        .request(server)
        .get('/api/v1/tag')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('tags');
          done();
        });
    });
    it('should get one tag', (done) => {
      chai
        .request(server)
        .get('/api/v1/tag/1')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.have.property('tag');
          done();
        });
    });

    it('should create a tag', (done) => {
      let tag = {
        tag: 'comggpafewny23',
      };
      chai
        .request(server)
        .post('/api/v1/tag')
        .send(tag)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(201);
          res.body.data.should.have.property('tag');
          createdTagId = res.body.data.tag.id;
          done();
        });
    });
    it('should delete a tag', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/tag/${createdTagId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
