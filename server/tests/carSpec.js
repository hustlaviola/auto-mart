/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;
let userToken; let adminToken;

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
  before(done => {
    chai
      .request(app)
      .post('/api/v1/auth/login')
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

describe('/PATCH CAR route', () => {
  it('should return an error if user is not authenticated', done => {
    const update = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
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
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
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
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/t1/status')
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

  it('should return an error if id is badly formatted', done => {
    const update = {
      status: 'sold',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1.01/status')
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

  it('should return an error if status field is empty', done => {
    const update = {
      status: '',
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
      .set('authorization', `Bearer ${userToken}`)
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
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
      .set('authorization', `Bearer ${userToken}`)
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
    chai
      .request(app)
      .patch('/api/v1/car/16/status')
      .set('authorization', `Bearer ${userToken}`)
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
    chai
      .request(app)
      .patch('/api/v1/car/2/status')
      .set('authorization', `Bearer ${userToken}`)
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
    chai
      .request(app)
      .patch('/api/v1/car/1/status')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('status')
          .eql('sold');
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    const update = {
      amount: 26700000.00,
    };
    chai
      .request(app)
      .patch('/api/v1/car/1/price')
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
      .patch('/api/v1/car/1/price')
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
      .patch('/api/v1/car/t1/price')
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
      .patch('/api/v1/car/5.6/price')
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
      .patch('/api/v1/car/1/price')
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
      .patch('/api/v1/car/1/price')
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

  it('should return an error if car record is not found', done => {
    const update = {
      amount: 26000000.09,
    };
    chai
      .request(app)
      .patch('/api/v1/car/17/price')
      .set('authorization', `Bearer ${userToken}`)
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
    chai
      .request(app)
      .patch('/api/v1/car/1/price')
      .set('authorization', `Bearer ${userToken}`)
      .send(update)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('price')
          .eql(update.amount);
        done(err);
      });
  });
});

describe('/GET CAR route', () => {
  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .get('/api/v1/car/1')
      .set('authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    chai
      .request(app)
      .get('/api/v1/car/1')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if id is not a number', done => {
    const car = {
      id: '1t',
    };
    chai
      .request(app)
      .get(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid Id, Please input a number');
        done(err);
      });
  });

  it('should return an error if id is badly formatted', done => {
    const car = {
      id: 1.6,
    };
    chai
      .request(app)
      .get(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid id format');
        done(err);
      });
  });

  it('should return an error if car record does not exist', done => {
    const car = {
      id: 48,
    };
    chai
      .request(app)
      .get(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car record not found');
        done(err);
      });
  });

  it('should retrieve a specific car if details are valid', done => {
    const car = {
      id: 1,
    };
    chai
      .request(app)
      .get(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.have.property('state');
        done(err);
      });
  });

  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set('authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    chai
      .request(app)
      .get('/api/v1/car')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if status is not provided in the query', done => {
    chai
      .request(app)
      .get('/api/v1/car?sttus=available')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('query \'status\' must be provided');
        done(err);
      });
  });

  it('should return an error if status is not equal to available', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=sold')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('status must be \'available\'');
        done(err);
      });
  });

  it('should retrieve all unsold cars if details are valid', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('state');
        done(err);
      });
  });

  it('should return an error if min_price is not provided', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&max_price=2000000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('query \'min_price\' must be provided');
        done(err);
      });
  });

  it('should return an error if min_price is not a number', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=20t0000&max_price=2050000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('min_price must be a number');
        done(err);
      });
  });

  it('should return an error if max_price is not provided', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=2000000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('query \'max_price\' must be provided');
        done(err);
      });
  });

  it('should return an error if max_price is not a number', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=200000&max_price=20t0000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('max_price must be a number');
        done(err);
      });
  });

  it('should return an error if max_price is not greater than min_price', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=2000000&max_price=1000000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('max_price must be greater than min_price');
        done(err);
      });
  });

  it('should retrieve all unsold cars within the price range if all details are valid', done => {
    chai
      .request(app)
      .get('/api/v1/car?status=available&min_price=200000&max_price=3000000')
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.data[0]).to.have.property('owner');
        done(err);
      });
  });
});

describe('/DELETE CAR route', () => {
  it('should return an error if user is not authenticated', done => {
    chai
      .request(app)
      .delete('/api/v1/car/1')
      .set('authorization', '')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    chai
      .request(app)
      .delete('/api/v1/car/1')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if id is not a number', done => {
    const car = {
      id: '1t',
    };
    chai
      .request(app)
      .delete(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid Id, Please input a number');
        done(err);
      });
  });

  it('should return an error if id is badly formatted', done => {
    const car = {
      id: 1.6,
    };
    chai
      .request(app)
      .delete(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Invalid id format');
        done(err);
      });
  });

  it('should return an error if car record does not exist', done => {
    const car = {
      id: 48,
    };
    chai
      .request(app)
      .delete(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car record not found');
        done(err);
      });
  });

  it('should return an error if user is not admin', done => {
    const car = {
      id: 3,
    };
    chai
      .request(app)
      .delete(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('require admin access');
        done(err);
      });
  });

  it('should delete a specific car record if details are valid', done => {
    const car = {
      id: 3,
    };
    chai
      .request(app)
      .delete(`/api/v1/car/${car.id}`)
      .set('authorization', `Bearer ${adminToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .eql('Car ad deleted successfully');
        done(err);
      });
  });
});
