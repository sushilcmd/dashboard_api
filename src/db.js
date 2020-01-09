const MongoClient = require("mongodb").MongoClient;

let dbConn = {};

const createDbConn = async function(dbName) {
  if (!!dbConn[dbName]) return dbConn[dbName];

  //   Creating Connection
  // console.log("Making Mongo DB Conn with", dbName);
  const uri =
    "mongodb+srv://sushil:HxFlXoTv4jnntMfc@cluster0-2avdp.mongodb.net/test?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  dbConn[dbName] = client.db(dbName);
  console.log("New Mongo DB Connection made...");
};

const getAgrregatedData = async function({ dbName, collection, query }) {
  if (!dbConn[dbName]) {
    await createDbConn(dbName);
  }
  try {
    const col = dbConn[dbName].collection(collection);
    const data = await col.aggregate(query).toArray();
    return data;
  } catch (error) {
    throw [500, "Mongo DB Aggregate Error", false, error.message];
  }
};

const findData = async function({ dbName, collection, query }) {
  if (!dbConn[dbName]) {
    await createDbConn(dbName);
  }
  try {
    const col = dbConn[dbName].collection(collection);
    const data = await col.findOne(query);
    return data;
  } catch (error) {
    throw [500, "Mongo DB FindOne Error", false, error.message];
  }
};

module.exports = { createDbConn, getAgrregatedData, findData };
