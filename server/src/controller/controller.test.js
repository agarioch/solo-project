const express = require('express');
const router = require('../router');
const supertest = require('supertest');
const coinModelData = require('../models/index');
require('dotenv').config();

const mongoose = require('mongoose');

describe('Integration tests', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = process.env.test_DB_URI;
    await mongoose.connect(url, { useNewUrlParser: true });
    await coinModelData.deleteMany();
  });

  afterEach(async () => {
    await coinModelData.deleteMany();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  const test = {
    userCoin: 'BTC',
    userAmount: 1,
    boughtPrice: 100,
    date: 'newDate',
  };

  it('should save coin data to the database', (done) => {
    request
      .post('/')
      .send(test)
      .then((res) => {
        coinModelData.findOne({ _id: res.body._id }).then((res2) => {
          expect(res2).toMatchObject(test);
        });
        done();
      });
  });

  it('should get coin data from the database', (done) => {
    request
      .post('/')
      .send(test)
      .then(async () => {
        const res = await request.get('/');
        const coinlist = await coinModelData.find();
        expect(res.body.length).toEqual(coinlist.length);
        expect(res.status).toEqual(200);
        done();
      });
  });

  it('should delete coin data from the database', (done) => {
    request
      .post('/')
      .send(test)
      .then(async (res) => {
        coinModelData.findOne({ _id: res.body._id }).then((res2) => {
          expect(res2).toMatchObject(test);
        });
        const newres = await request.delete(`/${res.body._id}`);
        expect(newres.status).toEqual(200);
        const coinlist = await coinModelData.find();
        expect(coinlist.length).toEqual(0);
        done();
      });
  });
});
