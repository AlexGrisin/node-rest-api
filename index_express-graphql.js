var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const env = require("./config/env");
const mongoose = require("mongoose");

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
app.use("/graphql", graphqlHTTP({ schema, graphiql: false }));
app.use("/graphiql", graphqlHTTP({ schema, graphiql: true }));

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
