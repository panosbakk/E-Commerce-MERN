require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

  app.listen(8765, () => {
    console.log("Server is listening on port 8765.");
  });