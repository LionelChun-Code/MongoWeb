const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

module.exports = {
  connect: () => client.connect(),
  getDb: () => client.db(),
  close: () => client.close(),
};
