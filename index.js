const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const favicon = require("serve-favicon");
// set port

const port = process.env.NODE_ENV !== "production" ? 3001 : process.env.PORT;

dotenv.config();

app.use(cors());
app.use(favicon(__dirname + "/images/favicon.ico"));

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.YELP_API_KEY}`,
};

app.get("/api/search", async (req, res) => {
  try {
    const { term } = req.query;
    const { location } = req.query;

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?term=${term}&category=(hairstylists, US)&location=${location}&limit=50`,
      {
        method: "GET",
        headers,
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.send({ data });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    res.send({ message: error });
  }
});

app.get("/api/stylist/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(`https://api.yelp.com/v3/businesses/${id}`, {
      method: "GET",
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      res.send({ data });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    res.send({ error });
  }
});

app.get("/api/reviews/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `https://api.yelp.com/v3/businesses/${id}/reviews`,
      {
        method: "GET",
        headers,
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.send({ data });
    } else {
      throw new Error(response.error);
    }
  } catch (error) {
    res.send({ error });
  }
});

app.get("/api/reviews", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
