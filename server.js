// Import the tools we installed
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Set up the app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve our HTML/CSS/JS files from a folder called "public"
app.use(express.static('public'));

// ---- This is our "queue state" - lives in memory while server runs ----
let queue = {
  currentToken: 0,        // the token currently being served
  waitingList: [],        // array of patients waiting, e.g. [{token: 2, name: "Ravi"}]
  avgConsultTime: 5,       // minutes, default value
  nextTokenNumber: 1       // the next token number to assign
};

// ---- When a browser tab connects (receptionist or waiting room) ----
io.on('connection', (socket) => {
  console.log('A screen connected:', socket.id);

  // As soon as they connect, send them the current state
  socket.emit('queueUpdate', queue);

  // Receptionist adds a new patient
  socket.on('addPatient', (name) => {
    const newPatient = { token: queue.nextTokenNumber, name: name };
    queue.waitingList.push(newPatient);
    queue.nextTokenNumber++;
    io.emit('queueUpdate', queue); // tell EVERYONE the new state
  });

  // Receptionist clicks "Call Next"
  socket.on('callNext', () => {
    if (queue.waitingList.length > 0) {
      const next = queue.waitingList.shift(); // remove first person from waiting list
      queue.currentToken = next.token;
      io.emit('queueUpdate', queue);
    }
  });

  // Receptionist sets average consultation time
  socket.on('setAvgTime', (minutes) => {
    queue.avgConsultTime = minutes;
    io.emit('queueUpdate', queue);
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});