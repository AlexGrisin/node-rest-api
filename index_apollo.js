var express = require("express");
var cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const env = require("./config/env");

const PORT = env.app.port;
const CONNECTION_URL = env.db.connection_url;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log(`👾 Conneted to database: ${CONNECTION_URL}`);
});

const app = express();
app.use(cors());

const server = new ApolloServer({
  schema: schema,
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
