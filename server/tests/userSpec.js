/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Signup route', () => {
  it('should return an error if firstname field is empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: '',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('firstname field cannot be empty');
        done(err);
      });
  });

  it('should return an error if firstname field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola33',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('firstname must be alphabets only');
        done(err);
      });
  });

  it('should return an error if firstname field is too long or too short', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Vi',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('firstname must be between within the range of 3 to 30');
        done(err);
      });
  });

  it('should return an error if lastname field is empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: '',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('lastname field cannot be empty');
        done(err);
      });
  });

  it('should return an error if lastname field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin33',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('lastname must be alphabets only');
        done(err);
      });
  });

  it('should return an error if lastname is too short or too long', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'vi',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('lastname must be between within the range of 3 to 30');
        done(err);
      });
  });

  it('should return an error if email field is empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: '',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email field cannot be empty');
        done(err);
      });
  });

  it('should return an error if email field is badly formatted', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola10gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid email format');
        done(err);
      });
  });

  it('should return an error if password field is empty', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: '',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password field cannot be empty');
        done(err);
      });
  });

  it('should return an error if password is less than 6 characters', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'vio56',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password must be at least 6 characters');
        done(err);
      });
  });

  it('should return an error if there is an existing email', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola1@mail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email already exists');
        done(err);
      });
  });

  it('should return an error if address is greater than 255 characters', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'vio568',
        address: `No 12, le blue sheridan, Viola state, Lorem ipsum tities cannot mess with whatevs
        Lorem ipsum tities cannot mess with whatevs Lorem ipsum tities cannot mess with whatevs
        Lorem ipsum tities cannot mess with whatevs Lorem ipsum tities cannot mess with whatevs`,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('address must not be greater than 255 chars');
        done(err);
      });
  });

  it('should create a new user if details are valid', done => {
    chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstname: 'Viola',
        lastname: 'Violin',
        email: 'viola10@gmail.com',
        password: 'viola10',
        address: 'No 12, le blue sheridan, Viola state.',
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        expect(res.body.data).to.have.property('email')
          .eql('viola10@gmail.com');
        done(err);
      });
  });
});

describe('/POST Login route', () => {
  it('should return an error if email field is empty', done => {
    const loginDetails = {
      email: '',
      password: 'viola10',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('email field cannot be empty');
        done(err);
      });
  });

  it('should return an error if email is badly formatted', done => {
    const loginDetails = {
      email: 'viola10mail.com',
      password: 'viola10',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid email format');
        done(err);
      });
  });

  it('should return an error if password field is empty', done => {
    const loginDetails = {
      email: 'viola1@mail.com',
      password: '',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password field cannot be empty');
        done(err);
      });
  });

  it('should return an error if password field is less than 6 characters', done => {
    const loginDetails = {
      email: 'viola1@mail.com',
      password: 'viola',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('password must be at least 6 characters');
        done(err);
      });
  });

  it('should return an error if email does not exist', done => {
    const loginDetails = {
      email: 'viola54@gmail.com',
      password: 'viola123',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('User does not exist');
        done(err);
      });
  });

  it('should return an error if email does not match password', done => {
    const loginDetails = {
      email: 'viola1@mail.com',
      password: 'viola12',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Password is incorrect');
        done(err);
      });
  });

  it('should log user in if details are valid', done => {
    const loginDetails = {
      email: 'viola1@mail.com',
      password: 'vvvvvv',
    };
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send(loginDetails)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('token');
        done(err);
      });
  });
});
