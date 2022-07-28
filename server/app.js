const http = require('http');
const express = require('express');
const {logger} = require('morgan');
const cors = require('cors');

// mongo connection
const mongoConnection = require("../config/index");

//routes
const indexRouter = require("../routes/index");
const userRouter = require("../routes/user.js");
const chatRoomRouter = require("../routes/chatRoom.js");
const deleteRouter = require("../routes/delete.js");

// middlewares
const { decode } = require('../middlewares/jwt.js');

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || 3000;
app.set("port", port);

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/room", decode, chatRoomRouter);
app.use("/delete", deleteRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Event listener for HTTP server "listening" event. */
server.listen(port , () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});