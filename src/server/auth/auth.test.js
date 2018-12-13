const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaiHttp = require('chai-http');
const server = require('../../index');

chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const User = require('./auth.model');

chai.config.includeStack = true;

describe('User', () => {
  const user = {
    username: 'NotAUsername',
    password: 'thisisntit',
  };


  const badUser = {
    username: 'baduser',
    password: 'notpass'
  };

  it('should not be able to login if they have not registered', (done) => {
    agent
      .post('/api/auth/login')
      .send(badUser)
      .then((res) => {
        res.status.should.be.equal(401);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to sign up', (done) => {
    User.findOneAndRemove({
      username: user.username
    }, () => {
      agent
        .post('/api/auth/signup')
        .send(user)
        .then((res) => {
          res.should.have.status(200);
          agent.should.have.cookie('directorDBToken');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  it('should be able to logout', (done) => {
    agent
      .get('/api/auth/logout')
      .then((res) => {
        res.should.have.status(200);
        agent.should.not.have.cookie('directorDBToken');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should be able to login', (done) => {
    agent
      .post('/api/auth/login')
      .send(user)
      .then((res) => {
        res.should.have.status(200);
        agent.should.have.cookie('directorDBToken');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
