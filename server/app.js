const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const WebSockets = require('../utils/WebSockets');


// mongo connection
mongoose.connect("mongodb+srv://swethaHirge:eNbiwvH7LUDppBrx@cluster0.0xins.mongodb.net/Ayush2908?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
  console.log('Mongo connection has an error', error)
  mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})

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

/** Create HTTP server. */
const server = http.createServer(app);
/** Create socket connection 
let globalio = socketio.listen(server);
globalio.on('connection', WebSockets.connection)
 Listen on provided port, on all network interfaces. */
server.listen(port);
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`)
});
