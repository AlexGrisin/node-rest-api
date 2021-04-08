var express = require("express");
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

const CONNECTION_URL = "mongodb://localhost/resthub";
const PORT = 8000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log(`👾 Conneted to database: ${CONNECTION_URL}`);
});

app.use(cors());

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: false,
  })
);

app.listen(PORT, () => {
  console.log(`🚀 Listening on port: ${PORT}`);
});
