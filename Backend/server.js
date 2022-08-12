"use strict";
const express = require("express");
const morgan = require("morgan");
const PORT = 8000;

const { getGames, getGame, getUser } = require("./handlers");
const { favsList } = require("./FavoritesHandler");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/", (req, res) => {
    res.send("Hello World!");
  })

  .get("/api/games", getGames)

  .get("/api/game/:gameId", getGame)

  .get("/api/:user/favorites", favsList)

  .post("/api/user", getUser)

  .patch("/api/:user/favorites", favsList)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
