/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let userToken;

describe('/POST ORDER route', () => {
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
    const order = {
      amount: 10899838.98,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', '')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    const order = {
      amount: 10899838.98,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if car id field is empty', done => {
    const order = {
      amount: 10899838.98,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('carId field cannot be empty');
        done(err);
      });
  });

  it('should return an error if car id is badly formatted', done => {
    const order = {
      carId: 3.67,
      amount: 10899838.98,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid id format');
        done(err);
      });
  });

  it('should return an error if car record does not exist', done => {
    const order = {
      carId: 34,
      amount: 10899838.98,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('car record does not exist');
        done(err);
      });
  });

  it('should return an error if amount field is empty', done => {
    const order = {
      carId: 1,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('amount field cannot be empty');
        done(err);
      });
  });

  it('should return an error if amount is badly formatted', done => {
    const amount = 233;
    const order = {
      carId: 1,
      amount,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid amount format');
        done(err);
      });
  });

  it('should create a purchase order if details are valid', done => {
    const amount = 233.76;
    const order = {
      carId: 1,
      amount,
    };
    chai
      .request(app)
      .post('/api/v1/order')
      .set('authorization', `Bearer ${userToken}`)
      .send(order)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('status')
          .eql('pending');
        done(err);
      });
  });
});
