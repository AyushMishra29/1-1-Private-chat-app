const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { generatemsg } = require('./utils/messages')

const { addUser, removeUser, getUser, getUserInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const PORT = process.env.PORT || 3000

const publicdir = path.join(__dirname, '../public')

app.use(express.static(publicdir))


io.on("connection", (socket) => {
    console.log("new connection")

    socket.on("join", ({ username, room }, cb) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return cb(error)
        }
        socket.join(user.room)
        socket.emit("message", generatemsg("Admin: Welcome"))
        socket.broadcast.to(user.room).emit("message", generatemsg(`Admin: ${user.username} has joined the room!`))

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        })
        cb()
    })

    socket.on("sendMessage", (msg, cb) => {
        const user = getUser(socket.id)
        io.to(user.room).emit("message", generatemsg(user.username, msg))
        cb()
    })


     // forward the private message to the right recipient (and to other tabs of the sender)
    socket.on("privateMessage", ({msg , to} , cb) => {
       const user2 = getUser(to);
        io.to(user2).emit("privateMessage", msg);
        cb();
     //messageStore.saveMessage(message);
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id)
        console.log(user)
        if (user) {
            io.to(user.room).emit("message", generatemsg(`Admin: ${user.username} has left the room`))

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUserInRoom(user.room)
            })
        }

    })


})

server.listen(PORT, () => {
    console.log("server s up" + PORT)
})