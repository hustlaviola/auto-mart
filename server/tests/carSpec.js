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

describe('/PATCH CAR route', () => {
  it('should return an error if id is not a number', done => {
    const update = {
      status: 'sold',
    };
    const car = {
      id: 't1',
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid Id, Please input a number');
        done(err);
      });
  });

  it('should return an error if id is badly formatted', done => {
    const update = {
      status: 'sold',
    };
    const car = {
      id: 1.01,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid id format');
        done(err);
      });
  });

  it('should return an error if status field is empty', done => {
    const update = {
      status: '',
    };
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('status field cannot be empty');
        done(err);
      });
  });

  it('should return an error if status is not sold', done => {
    const update = {
      status: 'slide',
    };
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('status must be sold');
        done(err);
      });
  });

  it('should return an error if car record is not found', done => {
    const update = {
      status: 'sold',
    };
    const car = {
      id: 16,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car record not found');
        done(err);
      });
  });

  it('should return an error if car is already marked as sold', done => {
    const update = {
      status: 'sold',
    };
    const car = {
      id: 3,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car has already been marked as sold');
        done(err);
      });
  });

  it('should mark the car as sold if all credentials are valid', done => {
    const update = {
      status: 'sold',
    };
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/status`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('status')
          .eql('sold');
        done(err);
      });
  });

  it('should return an error if id is not a number', done => {
    const update = {
      amount: 26700000.00,
    };
    const car = {
      id: 't1',
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
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
    const car = {
      id: 56.34,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
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
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
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
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid amount format');
        done(err);
      });
  });

  it('should return an error if car record is not found', done => {
    const update = {
      amount: 26000000.09,
    };
    const car = {
      id: 17,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car record not found');
        done(err);
      });
  });

  it('should update the amount if all details are valid', done => {
    const update = {
      amount: 26000000.09,
    };
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .patch(`/api/v1/car/${car.id}/price`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('newPrice')
          .eql(update.amount);
        done(err);
      });
  });
});
