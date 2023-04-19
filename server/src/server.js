"use srict";

require("dotenv").config(".env");
const express = require("express");
const { MongoClient } = require("mongodb");

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_ENDPOINT}:27017/?directConnection=true&serverSelectionTimeoutMS=2000&retryWrites=false`;

const client = new MongoClient(uri);
const db = client.db(`${process.env.MONGO_DB}`);
const recipeCollection = db.collection(`${process.env.MONGO_RECIPE_COLLECTION}`);
const orderCollection = db.collection(`${process.env.MONGO_ORDER_COLLECTION}`);

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

client.connect();

const getAllOrders = async (req, res) => {
  const result = await orderCollection.find({ });
  const orders = [];
  await result.forEach(order => {
    orders.push(order);
    console.log(order);
  });
  res.status(200).json(orders);
}

const newOrder = async (req, res) => {
  console.log(req.body);
  const order = {
    "firstName": req.body.first_name,
    "lastName": req.body.last_name,
    "drink": req.body.drink
  }
  const result = await orderCollection.insertOne(order);
  res.status(200).json(result);
}

app
  .route('/orders')
  // GET endpoint
  .get(getAllOrders)
  // POST endpoint
  .post(newOrder);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`)
});

