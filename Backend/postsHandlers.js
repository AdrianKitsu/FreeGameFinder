const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getPosts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Games");
    const posts = await db.collection("allposts").find().toArray();
    posts.length <= 0
      ? res
          .status(404)
          .json({ status: 404, data: posts, message: "No items found" })
      : res
          .status(200)
          .json({ status: 200, data: { posts }, message: "games retrieved" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

module.exports = { getPosts };
