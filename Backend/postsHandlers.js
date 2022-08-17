const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const postPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Games");
    const post = await db.collection("allposts").insertOne(req.body);

    post.acknowledged
      ? res
          .status(200)
          .json({ status: 200, data: post, message: "games retrieved" })
      : res
          .status(404)
          .json({ status: 404, data: post, message: "No items found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

const getPost = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const id = Number(req.params.id);

  try {
    await client.connect();
    const db = client.db("Games");
    const posts = await db.collection("allposts").find({ id: id }).toArray();

    posts.length <= 0
      ? res
          .status(404)
          .json({ status: 404, data: posts, message: "No posts found" })
      : res
          .status(200)
          .json({ status: 200, data: posts, message: "post retrieved" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

const allPosts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("Games");
    const posts = await db.collection("allposts").find().toArray();

    posts.length <= 0
      ? res
          .status(404)
          .json({ status: 404, data: posts, message: "Posts found" })
      : res
          .status(200)
          .json({ status: 200, data: posts, message: "Posts retrieved" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    await client.close();
  }
};

module.exports = { postPost, getPost, allPosts };
