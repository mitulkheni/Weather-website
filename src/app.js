const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utility/geocode.js");
const forecast = require("./utility/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Paths for Express configuration
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../Template/views");
const partialsPath = path.join(__dirname, "../Template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "John Doe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather",
    name: "John Doe",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Weather",
    name: "John Doe",
  });
});

app.get("/help/*", (req, res) => {
  res.send("Help article not Found");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  {
    res.send("My 404 page");
  }
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
