const request = require('supertest');
// const express = require('express');
const app = require('../index');
const nock = require('nock');
const mockSearchData = require('../mocks/searchData.json');
const mockStylistData = require('../mocks/stylistData.json');
const mockReviewData = require('../mocks/reviewData.json');
const mockErrorData = require('../mocks/errorData.json');
const mockErrorLocationData = require('../mocks/errorLocationData.json');
// const jest = require('jest');

// const app = express();

describe('GET results', () => {
  it('should get search results based on a term and location', async () => {
    const term = 'interlocks';
    const location = 'boston';
    nock('https://api.yelp.com')
      .get(
        `/v3/businesses/search?term=${term}&category=(hairstylists, US)&location=${location}&limit=50`,
      )
      .reply(200, mockSearchData);
    const res = await request(app).get(
      `/api/search?term=${term}&location=${location}`,
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockSearchData);
  });
  it('should display an error message if there is no search term or location', async () => {
    const term = null;
    const location = null;
    nock('https://api.yelp.com')
      .get(
        `/v3/businesses/search?term=${term}&category=(hairstylists, US)&location=${location}&limit=50`,
      )
      .reply(200, mockErrorLocationData);
    const res = await request(app).get(
      `/api/search?term=${term}&location=${location}`,
    );
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockErrorLocationData);
  });

  it('should get stylists based on a stylist id', async () => {
    const id = 'abcdef';
    nock('https://api.yelp.com')
      .get(`/v3/businesses/${id}`)
      .reply(200, mockStylistData);
    const res = await request(app).get(`/api/stylist/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockStylistData);
  });

  it('should get reviews based on a stylist id', async () => {
    const id = 'abcdef';
    nock('https://api.yelp.com')
      .get(`/v3/businesses/${id}/reviews`)
      .reply(200, mockReviewData);
    const res = await request(app).get(`/api/reviews/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockReviewData);
  });

  it('should display an error message if stylist is not found', async () => {
    const id = 'randomid';
    nock('https://api.yelp.com')
      .get(`/v3/businesses/${id}`)
      .reply(200, mockErrorData);
    const res = await request(app).get(`/api/stylist/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockErrorData);
  });

  it('should display an error message for reviews if stylist id is not found', async () => {
    const id = 'randomid';
    nock('https://api.yelp.com')
      .get(`/v3/businesses/${id}/reviews`)
      .reply(200, mockErrorData);
    const res = await request(app).get(`/api/reviews/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(mockErrorData);
  });
});
