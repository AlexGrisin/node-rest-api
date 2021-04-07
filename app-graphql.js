var express = require("express");
var { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

const CONNECTION_URL = "mongodb://localhost/resthub";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("conneted to database");
});

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
