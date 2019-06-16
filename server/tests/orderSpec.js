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


describe('/PATCH ORDER route', () => {
  it('should return an error if user is not authenticated', done => {
    const update = {
      amount: 26700000.00,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', '')
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    const update = {
      amount: 26700000.00,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if id is not a number', done => {
    const update = {
      amount: 26700000.00,
    };
    chai
      .request(app)
      .patch('/api/v1/order/t1/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid Id, Please input a number');
        done(err);
      });
  });

  it('should return an error if id is in invalid format', done => {
    const update = {
      amount: 26700000.00,
    };
    chai
      .request(app)
      .patch('/api/v1/order/5.6/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid id format');
        done(err);
      });
  });

  it('should return an error if amount field is empty', done => {
    const update = {};
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('amount field cannot be empty');
        done(err);
      });
  });

  it('should return an error if amount is in invalid format', done => {
    const update = {
      amount: 26,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid amount format');
        done(err);
      });
  });

  it('should return an error if order record is not found', done => {
    const update = {
      amount: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/17/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Order record not found');
        done(err);
      });
  });

  it('should return an error if order is not pending', done => {
    const update = {
      amount: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/2/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Only pending offers can be updated');
        done(err);
      });
  });

  it('should update the amount if all details are valid', done => {
    const update = {
      amount: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('newPriceOffered')
          .eql(update.amount);
        done(err);
      });
  });
});
