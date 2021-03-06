var express = require("express");
var cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const env = require("./config/env");

const PORT = env.app.port;

mongoose.connect(env.db.connection_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  user: env.db.user,
  pass: env.db.password,
});
mongoose.connection.once("open", () => {
  console.log(`👾 Conneted to database: ${env.db.connection_url}`);
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
