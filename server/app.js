const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 1024;
const server = app.listen(port);
const publicPath = path.join(__dirname, '../public')
const socketIO = require('socket.io')
const io = socketIO(server);

let users = [];
let connections = [];
app.use(express.static(publicPath));
app.get('/', (req, res) => {
    res.sendFile(publicPath + '/index.html')
});

let games = io.of('/my-namespace');
games.on('connection', (socket) => {
    console.log("Connected");
    socket.on('newMessage', (message) => {
        console.log(message)
        games.emit('createMessage', message)
    })

socket.on('disconnect',()=>{
         console.log("Disconnected")
        
      })
})

let movies = io.of('/movies');
movies.on('connection', (socket) => {
    connections.push(socket);
    console.log("Connected");
    socket.on('newMessage', (message) => {
        console.log(message)
        movies.emit('createMessage', message)
    })
})
//  let count=0;
//  let roomno=1;
//  let movies = io.of('/movies');
//  movies.on('connection',(socket)=>{
//  connections.push(socket);
//      count++;
//      console.log(count);                                        
//      console.log("Connected");
//      if(count>2){
//          roomno++;
//      }
//     socket.join('roomno');
//      movies.in('roomno').emit('connectRoom',`You are in room ${roomno}`)
//      socket.on('newMessage',(message)=>{
//         console.log(message)
//         movies.emit('createMessage',message)
//     })  
// })  






server.listen(port, () => {
    console.log(`Connected to port ${port}`)
})