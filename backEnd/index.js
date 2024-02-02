const express = require("express");
const { config } = require("dotenv");
const chats = require("./dummyData/data");
config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("hello client");
});

app.get("/chats", (req, res) => {
  return res.json(chats);
});

app.get("/chats/:id", (req, res) => {
  return res.json(chats.find((c) => c._id === req.params.id));
});

app.listen(PORT, () => console.log("Server is running on port : " + PORT));
