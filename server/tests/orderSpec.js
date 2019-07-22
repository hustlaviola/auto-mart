/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let userToken;
let userToken3;
let adminToken;

describe('/POST ORDER route', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'viola1@mail.com',
        password: 'vvvvvv',
      })
      .end((err, res) => {
        userToken = res.body.data.token;
        done(err);
      });
  });
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'viola3@mail.com',
        password: 'vvvvvv',
      })
      .end((err, res) => {
        userToken3 = res.body.data.token;
        done(err);
      });
  });
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'viola2@mail.com',
        password: 'vvvvvv',
      })
      .end((err, res) => {
        adminToken = res.body.data.token;
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
          .eql('car_id field cannot be empty');
        done(err);
      });
  });

  it('should return an error if car id is badly formatted', done => {
    const order = {
      car_id: 3.67,
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
      car_id: 34,
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
          .eql('Car record not found');
        done(err);
      });
  });

  it('should return an error if amount field is empty', done => {
    const order = {
      car_id: 4,
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
    const amount = '23346.8r09';
    const order = {
      car_id: 4,
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

  it('should return an error if car is already sold', done => {
    const amount = 22343;
    const order = {
      car_id: 2,
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
          .eql('Car has already been marked as sold');
        done(err);
      });
  });

  it('should create a purchase order if details are valid', done => {
    const amount = 233.76;
    const order = {
      car_id: 4,
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
      price: 26700000.00,
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
      price: 26700000.00,
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
      price: 26700000.00,
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
      price: 26700000.00,
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

  it('should return an error if price field is empty', done => {
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
          .eql('price field cannot be empty');
        done(err);
      });
  });

  it('should return an error if price is in invalid format', done => {
    const update = {
      price: '23346.8r09',
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
          .eql('invalid price format');
        done(err);
      });
  });

  it('should return an error if order record is not found', done => {
    const update = {
      price: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/17/price')
      .set('authorization', `Bearer ${userToken3}`)
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
      price: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/2/price')
      .set('authorization', `Bearer ${adminToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Only pending offers can be updated');
        done(err);
      });
  });

  it('should update the price if all details are valid', done => {
    const update = {
      price: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/order/1/price')
      .set('authorization', `Bearer ${userToken3}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('new_price_offered')
          .eql(update.price);
        done(err);
      });
  });
});
