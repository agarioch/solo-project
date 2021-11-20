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

  beforeAll(() => {
    const url = process.env.DB_URI;
    mongoose.connect(url, { useNewUrlParser: true });
  });

  afterEach(async () => {
    await coinModelData.deleteMany();
  });

  afterAll(() => {
    mongoose.disconnect();
  });

  it('should save coin data to the database', (done) => {
    const test = {
      userCoin: 'BTC',
      userAmount: 1,
      boughtPrice: 100,
      date: 'newDate',
    };

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
    request.get('/').then((res) => {
      expect(res.status).toEqual(200);
      done();
    });
  });
});
