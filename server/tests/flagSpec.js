/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

const { expect } = chai;

let userToken;

describe('/POST FLAG route', () => {
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

  it('should return an error if user is not authenticated', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', '')
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('You are not logged in');
        done(err);
      });
  });

  it('should return an error if token cannot be authenticated', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', 'urgjrigriirkjwUHJFRFFJrgfr')
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Authentication failed');
        done(err);
      });
  });

  it('should return an error if car id field is empty', done => {
    const flag = {
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('car_id field cannot be empty');
        done(err);
      });
  });

  it('should return an error if car id is badly formatted', done => {
    const flag = {
      car_id: 1.67,
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('invalid id format');
        done(err);
      });
  });

  it('should return an error if car record does not exist', done => {
    const flag = {
      car_id: 91,
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('Car record not found');
        done(err);
      });
  });

  it('should return an error if reason field is empty', done => {
    const flag = {
      car_id: 1,
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('reason field cannot be empty');
        done(err);
      });
  });

  it('should return an error if reason is more than 75 characters', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf gffgghh',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('reason cannot be more than 75 characters');
        done(err);
      });
  });

  it('should return an error if description field is empty', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('description field cannot be empty');
        done(err);
      });
  });

  it('should return an error if description is more than 750 characters', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities',
      description: `Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd
      Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd`,
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error')
          .eql('description cannot be more than 750 characters');
        done(err);
      });
  });

  it('should flag an ad if details are valid', done => {
    const flag = {
      car_id: 1,
      reason: 'Lorem ipsum tities',
      description: 'Ljsjfkfd jfjfjdjfjdf dfjdjfjddfj fkdfjjfd jfdjfjfjdfj eefjefjjjjf fjdskfdfd',
    };
    chai
      .request(app)
      .post('/api/v1/flags')
      .set('authorization', `Bearer ${userToken}`)
      .send(flag)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('reason')
          .eql(flag.reason);
        done(err);
      });
  });
});
