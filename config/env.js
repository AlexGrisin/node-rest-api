const env = process.env.NODE_ENV;

const local = {
  app: {
    port: 8000,
  },
  db: {
    connection_url: "mongodb://localhost/test",
    user: "node_user",
    password: "password",
  },
};

const dev = {
  app: {
    port: 8000,
  },
  db: {
    connection_url: "mongodb://87.251.71.72:27017/test",
    user: "node_user",
    password: "password",
  },
};

const config = {
  local,
  dev,
};

module.exports = config[env];
