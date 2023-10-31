const request = require('supertest');
const express = require('express');
const nock = require('nock');
// const jest = require('jest');

const app = express();

describe('GET search results', () => {
  it('does a thing', () => {
    expect(true).toBe(true);
  });

  it('should get search results based on a term and location', async () => {
    const res = await request(app).get(
      'api/search?term=interlocks+sisterlocks&location=boston',
    );

    console.log(res);
    expect(res.headers).toHaveProperty('Content-Type');
  });
});
