const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const app = express();
// set port

const port = 3001;

dotenv.config();

app.get("/api/search", async (req, res) => {
  console.log("trying");
  console.log(req.query, "req params");
  const { term } = req.query;
  const { location } = req.query;
  console.log(term, "search term");

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

  const data = await response.json();
  console.log(data, "data");
  res.send({ message: data });
  //   res.send({ message: "ok" });
  //   try {
  //     // need to send network request and append api key
  //     // then return the result to the front end
  //     // need to create a new headers object?
  //     // should append authorization header to new headers
  //   } catch (error) {
  //     console.error(error);
  //     console.log("error");
  //     res.send({ error });
  //   }
});

app.get("/hi", (req, res) => {
  console.log("at least it logged");
  res.send("called");
});

app.get("/", (req, res) => {
  res.send("GET Request Called");
});

app.listen(port, () => {
  console.log(`Server is now listening on port ${port}`);
});
