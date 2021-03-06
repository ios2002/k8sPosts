const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
let counter = 0;
app.get("/posts", (req, res) => {
  // console.warn("-------------------------------- came here" + counter++);
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
    comments: [],
  };

  await axios.post("http://event-bus-service:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  if (req.body.type === "CommentModerated") {
    posts[req.body.data.postId].comments.push(req.body.data);
  }
  res.send({});
});

app.listen(4000, () => {
  console.warn("v2000");
  console.log("Listening on 4000");
});
