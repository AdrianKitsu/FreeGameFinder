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

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //changing the req.params to a number
  const { email } = req.body;

  try {
    await client.connect();
    const db = client.db("Games");
    //using the number _id to filter for single item
    const user = await db.collection("users").findOne({ email });

    user
      ? res.status(200).json({ status: 200, data: user, message: "user found" })
      : res.status(404).json({ status: 404, messsage: "user not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: "banana" });
  } finally {
    await client.close();
  }
};

const getCurrentUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //changing the req.params to a number
  const { user } = req.params;

  try {
    await client.connect();
    const db = client.db("Games");
    //using the number _id to filter for single item
    const currentUser = await db.collection("users").findOne({ email: user });

    currentUser
      ? res
          .status(200)
          .json({ status: 200, data: currentUser, message: "user found" })
      : res.status(404).json({ status: 404, messsage: "user not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: "Error" });
  } finally {
    await client.close();
  }
};

const getGameByGenre = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  //changing the req.params to a number
  const genre = req.params.genre;

  try {
    await client.connect();
    const db = client.db("Games");
    const gameGenre = await db
      .collection("allgames")
      .find({ genre: genre })
      .toArray();

    gameGenre.length > 0
      ? res.status(200).json({
          status: 200,
          data: gameGenre,
          message: `items filtered by ${genre} `,
        })
      : res.status(404).json({
          status: 404,
          data: gameGenre,
          message: `Could not find items by category: ${genre}`,
        });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: "Game Genre Error" });
  } finally {
    await client.close();
  }
};

module.exports = { getGames, getGame, getUser, getCurrentUser, getGameByGenre };
