require("dotenv").config();
require("express-async-errors");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const apiPort = process.env.PORT || 5000;

const connectDB = require("./lib/db/connect");
const productsRouter = require("./routes/products");

app.use(cors());
app.use(express.json());

const errorMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products/">products route</a>');
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(apiPort, console.log(`Server running on port ${apiPort}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
