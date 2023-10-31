const request = require('supertest');
const express = require('express');
const fetch = require('node-fetch');
// const jest = require('jest');

// jest.mock('node-fetch');

// import fetch from 'node-fetch';

const app = express();

describe('GET search results', () => {
  it('does a thing', () => {
    expect(true).toBe(true);
  });

  it('should get search results based on a term and location', async () => {
    await request(app)
      .get('api/search?term="interlocks"&location-"boston"')
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
      });
    console.log(res);
  });
  //   it('should grab dog breeds', () => {
  //     request('https://dog.ceo')
  //       .get('/api/breeds/image/random')
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) throw err;
  //       });
  //   });
});
