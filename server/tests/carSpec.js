/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('/POST CAR route', () => {
  it('should return an error if state field is empty', done => {
    const price = 23346.89;
    const car = {
      state: '',
      price,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
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
    const price = 23346.89;
    const car = {
      state: 'red',
      price,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('state can either be \'new\' or \'used\'');
        done(err);
      });
  });

  it('should return an error if price field is empty', done => {
    const car = {
      state: 'new',
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('price field cannot be empty');
        done(err);
      });
  });

  it('should return an error if price is badly formatted', done => {
    const price = 23346.809;
    const car = {
      state: 'new',
      price,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid price format');
        done(err);
      });
  });

  it('should return an error if manufacturer field is empty', done => {
    const price = 23346.89;
    const car = {
      state: 'new',
      price,
      manufacturer: '',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
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
    const price = 23346.89;
    const car = {
      state: 'new',
      price,
      manufacturer: 'Toyota',
      model: '',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
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
    const price = 23346.89;
    const car = {
      state: 'new',
      price,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: '',
    };
    chai
      .request(app)
      .post('/api/v1/car')
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
    const price = 23346.89;
    const car = {
      state: 'new',
      price,
      manufacturer: 'Toyota',
      model: 'Yaris',
      bodyType: 'Sedan',
    };
    chai
      .request(app)
      .post('/api/v1/car')
      .send(car)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('price')
          .eql(car.price);
        expect(res.body.data).to.have.property('status')
          .eql('available');
        done(err);
      });
  });
});
