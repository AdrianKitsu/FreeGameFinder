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
  const { title } = req.body;

  try {
    await client.connect();
    const db = client.db("Games");
    // finding their favs based on user
    let usersList = await db
      .collection("users")
      .updateOne({ email: user }, { $push: { favorites: title } });

    //if list does not exist for user
    // if (!usersList) {
    //   //no cart exist for user, must create new cart
    //   //inserting a new item into cart
    //   favorites = await db.collection("favorites").updateOne({
    //     _id,
    //     user,
    //     favoritedGame: [req.body],
    //   });

    //   return res.status(200).json({
    //     status: 200,
    //     data: favorites,
    //     message: "Game added to Favorites",
    //   });
    // }

    return res
      .status(200)
      .json({ status: 200, message: "Game added to Favorites" });
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
