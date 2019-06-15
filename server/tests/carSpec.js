/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;
let userToken;

describe('/POST CAR route', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'viola1@mail.com',
        password: 'vvvvvv',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', '')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if state field is empty', done => {
    const amount = 23346.89;
    const car = {
      state: '',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('car state field cannot be empty');
        done(err);
      });
  });

  it('should return an error if state is neither "new" nor "used"', done => {
    const amount = 23346.89;
    const car = {
      state: 'red',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('state can either be \'new\' or \'used\'');
        done(err);
      });
  });

  it('should return an error if amount field is empty', done => {
    const car = {
      state: 'new',
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('amount field cannot be empty');
        done(err);
      });
  });

  it('should return an error if amount is badly formatted', done => {
    const amount = 23346.809;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid amount format');
        done(err);
      });
  });

  it('should return an error if manufacturer field is empty', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: '',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('manufacturer field cannot be empty');
        done(err);
      });
  });

  it('should return an error if model field is empty', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: '',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('model field cannot be empty');
        done(err);
      });
  });

  it('should return an error if body type field is empty', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: '',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('bodyType field cannot be empty');
        done(err);
      });
  });

  it('should create a car sale advertisement if details are valid', done => {
    const amount = 23346.89;
    const car = {
      state: 'new',
      amount,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .set('authorization', `Bearer ${userToken}`)
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('price')
          .eql(car.amount);
        expect(res.body.data).to.have.property('status')
          .eql('available');
        done(err);
      });
  });
});
