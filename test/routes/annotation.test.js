//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();
chai.use(chaiHttp);

describe('Annotation routes', () => {
  describe('Test All routes in annotation', () => {
    let token;
    let annotationId;
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
    it('should get all annotations', (done) => {
      chai
        .request(server)
        .get('/api/v1/annotation')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('annotations');
          done();
        });
    });
    it('should get one annotation', (done) => {
      chai
        .request(server)
        .get('/api/v1/annotation/1')
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('annotation');
          done();
        });
    });

    it('should create an annotation', (done) => {
      let annotation = {
        snippetid: 1,
        tagid: 2,
        annotation: 'tim3e',
      };
      chai
        .request(server)
        .post('/api/v1/annotation')
        .send(annotation)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('annotation');
          annotationId = res.body.annotation.id;
          done();
        });
    });
    // deletes previously made annotation, however this shouldn't be done in a real environment
    it('should delete an annotation', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/annotation/${annotationId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});
