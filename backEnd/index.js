const express = require("express");
const { config } = require("dotenv");
const chats = require("./dummyData/data");
const cors = require("cors");
config();
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  return res.send("hello client");
});

app.get("/api/chats", (req, res) => {
  return res.json(chats);
});

app.get("/api/chats/:id", (req, res) => {
  return res.json(chats.find((c) => c._id === req.params.id));
});

app.listen(PORT, () => console.log("Server is running on port : " + PORT));
