const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
// set port

const port = 3001;

dotenv.config();

app.use(cors());

app.get("/api/search", async (req, res) => {
  try {
    const { term } = req.query;
    const { location } = req.query;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    };

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
      throw new Error();
    }
  } catch {
    res.send({ message: "something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
