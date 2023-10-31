const request = require('supertest');
// const express = require('express');
const app = require('../index');
const nock = require('nock');
const mockSearchData = require('../mocks/searchData.json');
// const jest = require('jest');

// const app = express();

describe('GET search results', () => {
  it('does a thing', () => {
    expect(true).toBe(true);
  });

  it('should get search results based on a term and location', async () => {
    const term = 'interlocks+sisterlocks';
    const location = 'boston';
    nock('https://api.yelp.com')
      .get(`/v3/businesses/search?term=${term}&location=${location}`)
      .reply(200, mockSearchData);
    const res = await request(app).get(`/api/search`);
    expect(res.status).toBe(200);
    console.log(res);
  });
});
