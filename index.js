const express = require("express");
var cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

// const CONNECTION_URL = "mongodb://localhost/resthub";
const CONNECTION_URL = "mongodb://87.251.71.72:27017";

const DATABASE_NAME = "test";
const PORT = 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  MongoClient.connect(
    CONNECTION_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      database = client.db(DATABASE_NAME);
      collection = database.collection("users");
      console.log("Connected to `" + DATABASE_NAME + "`!");
    }
  );
});

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/users", (request, response) => {
  collection.find({}).toArray((error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.get("/users/:id", (request, response) => {
  collection.findOne({ _id: new ObjectId(request.params.id) }, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result);
  });
});

app.post("/users/add", (request, response) => {
  collection.insert(request.body, (error, result) => {
    if (error) {
      return response.status(500).send(error);
    }
    response.send(result.result);
  });
});
