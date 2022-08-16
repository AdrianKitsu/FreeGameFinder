const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//adding games to favs or creating favs list if no cart exist
const favsList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { user } = req.params;
  const { title, id, favorited, url } = req.body;

  try {
    await client.connect();
    const db = client.db("Games");

    if (favorited) {
      await db
        .collection("users")
        .updateOne({ email: user }, { $pull: { favorites: { title, id } } });
      return res
        .status(200)
        .json({ status: 200, message: "Game removed to Favorites" });
    } else {
      await db
        .collection("users")
        .updateOne(
          { email: user },
          { $push: { favorites: { title, id, url } } }
        );
      return res
        .status(200)
        .json({ status: 200, message: "Game added to Favorites" });
    }
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { favsList };
