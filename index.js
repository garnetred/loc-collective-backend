// import express from 'express';
const express = require('express');
const { config } = require('dotenv');
// import { config } from 'dotenv';
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
const cors = require('cors');
const app = express();
const favicon = require('serve-favicon');

// import cors from 'cors';
// import favicon from 'serve-favicon';
// import path from 'path';
// const __dirname = path.resolve();
// set port

const port = process.env.NODE_ENV !== 'production' ? 3001 : process.env.PORT;

config();

app.use(cors());
app.use(favicon(__dirname + '/images/favicon.ico'));

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${process.env.YELP_API_KEY}`,
};

app.get('/api/search', async (req, res) => {
  try {
    const { term } = req.query;
    const { location } = req.query;

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?term=${term}&category=(hairstylists, US)&location=${location}&limit=50`,
      {
        method: 'GET',
        headers,
      },
    );

    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.get('/api/stylist/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.get('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${id}/reviews`,
      {
        method: 'GET',
        headers,
      },
    );
    const data = await response.json();
    res.send({ data });
  } catch (error) {
    res.send({ message: error.message });
  }
});

app.get('/api/reviews', async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
