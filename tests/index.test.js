const request = require('supertest');
const express = require('express');
// const jest = require('jest');

jest.mock('node-fetch');

const app = express();
const fetch = require('node-fetch');

describe('GET search results', () => {
  it('does a thing', () => {
    expect(true).toBe(true);
  });

  it('should get search results based on a term and location', async () => {
    const res = await request(app).get(
      'api/search?term="interlocks"&location="boston"',
    );

    console.log(res);
    expect(res.headers).toHaveProperty('Content-Type');

    //   .expect(request.headers)
    //   .toBe({ 'Content-Type': 'application/json' })
    //   .end(function (err, res) {
    //     if (err) {
    //       throw err;
    //     } else {
    //       console.log(res, 'res');
    //     }
    //   });
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
