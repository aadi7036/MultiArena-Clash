const http = require('http');
const socketIO = require('socket.io');
const dotenv = require('dotenv');
const { authenticateSocket } = require('../middleware/auth');

dotenv.config();

const server = http.createServer();
const io = socketIO(server, {
  cors: { origin: process.env.WEBSOCKET_CORS_ORIGIN || 'http://localhost:3000', methods: ['GET', 'POST'] },
});

io.use((socket, next) => { authenticateSocket(socket, next); });

const matchmaking = new Map();
const activeMatches = new Map();

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.user.username}`);

  socket.on('join-queue', (data) => {
    const { gameMode, region } = data;
    const queueKey = `${gameMode}-${region}`;

    if (!matchmaking.has(queueKey)) matchmaking.set(queueKey, []);

    const queue = matchmaking.get(queueKey);
    queue.push({ socket, user: socket.user, joinedAt: Date.now() });
    socket.emit('queue-joined', { position: queue.length });

    if (queue.length >= parseInt(process.env.MAX_PLAYERS_PER_MATCH)) startMatch(io, queueKey);
  });

  socket.on('leave-queue', () => {
    removeFromQueues(socket);
    socket.emit('queue-left');
  });

  socket.on('game-action', (data) => {
    const matchId = data.matchId;
    if (activeMatches.has(matchId)) {
      io.to(matchId).emit('player-action', { playerId: socket.user.userId, action: data });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Player disconnected: ${socket.user.username}`);
    removeFromQueues(socket);
  });
});

function startMatch(io, queueKey) {
  const queue = matchmaking.get(queueKey);
  const maxPlayers = parseInt(process.env.MAX_PLAYERS_PER_MATCH);
  const players = queue.splice(0, maxPlayers);
  const matchId = `match-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  activeMatches.set(matchId, { players, startTime: Date.now() });

  players.forEach((player) => { player.socket.join(matchId); });
  io.to(matchId).emit('match-started', {
    matchId,
    players: players.map((p) => ({ id: p.user.userId, username: p.user.username })),
    startTime: Date.now(),
  });
}

function removeFromQueues(socket) {
  matchmaking.forEach((queue, key) => {
    const index = queue.findIndex((p) => p.socket.id === socket.id);
    if (index !== -1) queue.splice(index, 1);
  });
}

const PORT = process.env.WEBSOCKET_PORT || 3001;
server.listen(PORT, () => { console.log(`WebSocket server running on port ${PORT}`); });

module.exports = io;