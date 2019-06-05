/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST ORDER route', () => {
  it('should return an error if amount field is empty', done => {
    const order = {};
    chai
      .request(app)
      .post('/api/v1/order')
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
      amount,
    };
    chai
      .request(app)
      .post('/api/v1/order')
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
      amount,
    };
    chai
      .request(app)
      .post('/api/v1/order')
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
