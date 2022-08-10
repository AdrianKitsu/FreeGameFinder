const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

//adding games to favs or creating favs list if no cart exist
const creatingCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const user = req.params.user;
  //create random id
  const _id = uuidv4();

  try {
    await client.connect();
    const db = client.db("UsersFavs");
    // finding a cart based on user
    let usersCart = await db.collection("favorites").findOne({ user });

    //if cart does not exist for user
    if (!usersCart) {
      //no cart exist for user, must create new cart
      //inserting a new item into cart
      cart = await db.collection("cart").insertOne({
        _id,
        user,
        purchasedItems: [req.body],
      });

      return res
        .status(200)
        .json({ status: 200, data: cart, message: "new cart created" });
    }
    //if cart exists
    else {
      //find users cart
      const cartArr = await db.collection("cart").find({ user }).toArray();

      const cart = cartArr[0];
      //check if item is in users array
      const item = cart.purchasedItems.filter(
        (item) => item._id === req.body._id
      );
      //if the item is in the cart
      if (item.length > 0) {
        const purchase = item[0];
        //update the quantity of the item
        const updateQuantity = await db.collection("cart").updateOne(
          { user, "purchasedItems._id": req.body._id },
          {
            $set: {
              "purchasedItems.$.quantity":
                Number(req.body.quantity) + purchase.quantity,
            },
          }
        );
        return res.status(200).json({
          status: 200,
          data: updateQuantity,
          message: "item quantity updated",
        });
      }
      // if item is not in cart it will add it to purchasedItems
      const data = await db.collection("cart").updateOne(
        {
          user,
        },
        { $push: { purchasedItems: req.body } }
      );

      return res
        .status(200)
        .json({ status: 200, data: data, message: "new item added" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};
