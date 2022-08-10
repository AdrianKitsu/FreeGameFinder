const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getGames = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Games");
    const results = await db.collection("allgames").find().toArray();
    results.length <= 0
      ? res
          .status(404)
          .json({ status: 404, data: results, message: "No items found" })
      : res
          .status(200)
          .json({ status: 200, data: { results }, message: "games retrieved" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

const getGame = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //changing the req.params to a number
  const id = Number(req.params.gameId);

  try {
    await client.connect();
    const db = client.db("Games");
    //using the number _id to filter for single item
    const game = await db.collection("allgames").findOne({ id });
    //if game was found by id status 200 if not status 404
    //return item as a object
    game
      ? res
          .status(200)
          .json({ status: 200, data: game, message: "game received" })
      : res
          .status(404)
          .json({ status: 404, data: game, messsage: "game not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: "banana" });
  } finally {
    await client.close();
  }
};

module.exports = { getGames, getGame };
