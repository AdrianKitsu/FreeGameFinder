const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const allGames = require("./data/games.json");

const batchImportGames = async () => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Games");
    await db.collection("allgames").insertMany(allGames);
    console.log("all games added");
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

batchImportGames();
