require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/errorHandler");
const port = 8081;
const authRoutes = require("./routes/auth");
const db = require("./models/index");
const messagesRoutes = require("./routes/messages");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoutes);
app.use(
  "/api/user/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);
app.get("/api/messages", async function(req, res, next) {
  try {
    let messages = await db.Message.find({})
      .sort({ createdAt: "desc" })
      .populate("user", {
        username: true,
        profileImageUrl: true
      });
    return res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(port, function() {
  console.log(`Server started on ${port}`);
});
