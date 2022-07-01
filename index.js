const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 5000;
// method
app.use(cors())
app.use(express.json())






const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://shuvo:hQuC6DhLEA2gNWe8@cluster0.hvhip.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
  try {
    await client.connect();

    const taskCollection = client.db("task").collection("manager");
    const completeCollection = client.db("task").collection("complete");
    app.get('/task', async (req, res) => {
      const query = {}
      const result = await taskCollection.find(query).toArray();
      res.send(result)
    })
    app.get('/task/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await taskCollection.findOne(query);
      res.send(result)
    })
    app.get('/complete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await completeCollection.findOne(query);
      res.send(result)
    })
    app.get('/complete', async (req, res) => {
      const query = {}
      const result = await completeCollection.find(query).toArray();
      res.send(result)
    })
    app.post('/task', async (req, res) => {
      const body = req.body
      const result = await taskCollection.insertOne(body);
      res.send({ result })
    })
    app.post('/complete', async (req, res) => {
      const body = req.body
      const result = await completeCollection.insertOne(body);
      res.send({ result })
    })
    app.delete('/task/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await taskCollection.deleteOne(query);
      res.send(result)
    })
    app.delete('/complete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) }
      const result = await completeCollection.deleteOne(query);
      res.send(result)
    })
    app.put('/task/:id', async (req, res) => {
      const id = req.params.id;
      const task = req.body;
      console.log(task);
      const filter = { _id: ObjectId(id) };

      const options = { upsert: true };
      const updateDoc = {
        $set: task,
      };



      const result = await taskCollection.updateOne(filter, updateDoc, options);
      res.send({ result });
    })

  }
  finally {

  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(port);

})
app.get('/', (req, res) => {
  res.send("success the connection")
  console.log(`connection seccess ${port}`);

})