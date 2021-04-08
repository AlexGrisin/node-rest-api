var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const env = require("./config/env");
const mongoose = require("mongoose");

const PORT = env.app.port;
const CONNECTION_URL = env.db.connection_url;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
  console.log(`👾 Conneted to database: ${CONNECTION_URL}`);
});

const app = express();
app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: false }));
app.use("/graphiql", graphqlHTTP({ schema, graphiql: true }));

app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}`));
