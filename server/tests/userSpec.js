/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Signup route', () => {
  it('should return an error if first name field is empty', done => {
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

  it('should return an error if first name field is badly formatted', done => {
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
          .eql('first name must be alphabets only between 3 and 30');
        done(err);
      });
  });

  it('should return an error if last name field is empty', done => {
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

  it('should return an error if last name field is badly formatted', done => {
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
          .eql('last name must be alphabets only between 3 and 30');
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
        email: 'viola@yahoo.com',
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
