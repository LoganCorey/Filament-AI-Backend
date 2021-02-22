//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/index');
let should = chai.should();
chai.use(chaiHttp);

describe('User Routes', () => {
  describe('Test a user login and logout', () => {
    let token;
    let userId;
    before((done) => {
      // get token, should probably revisit this
      let user = {
        email: 'logan.corey@mail.utoronto.ca',
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

    it('should successfully register a user', (done) => {
      let user = {
        email: 'fo4fgregferger23obgeja3123fr@gmail.com',
        phone: '423-131-1323',
        password: 'password',
        passwordConfirm: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/user/signup')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          userId = res.body.user.id;
          done();
        });
    });

    it('should delete a user', (done) => {
      chai
        .request(server)
        .delete(`/api/v1/user/${userId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('should successfully login a user', (done) => {
      let user = {
        email: 'logan@coldiron.ca',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('token');
          done();
        });
    });

    it('should return 401 due to bad account', (done) => {
      let user = {
        email: 'logan@coldiron.com',
        password: 'password',
      };
      chai
        .request(server)
        .post('/api/v1/user/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });
});
