# MultiArena Clash API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register
```
POST /auth/register
Content-Type: application/json
{
  "username": "player123",
  "email": "player@example.com",
  "password": "securePassword123"
}
Response: 201
{
  "token": "jwt_token_here",
  "user": { "id": "user_id", "username": "player123", "email": "player@example.com", "avatar": "avatar_url" }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json
{
  "email": "player@example.com",
  "password": "securePassword123"
}
Response: 200
{ "token": "jwt_token_here", "user": {...} }
```

#### Get Current User
```
GET /auth/me
Authorization: Bearer <token>
Response: 200
{ "id": "user_id", "username": "player123", "stats": {...}, "rank": "Gold" }
```

### Users

#### Get User Profile
```
GET /users/:userId
Response: 200
{ "id": "user_id", "username": "player123", "avatar": "url", "stats": {...}, "rank": "Gold" }
```

### Leaderboard

#### Get Global Leaderboard
```
GET /leaderboard?page=1&limit=50&season=current&region=global
Response: 200
{ "leaderboard": [...], "pagination": {...} }
```

#### Get User Rank
```
GET /leaderboard/rank/:userId
Response: 200
{ "username": "player123", "rank": 250, "eloRating": 1500, "wins": 45 }
```

### Matches

#### Get Match History
```
GET /matches/history/:userId?page=1&limit=20
Response: 200
{ "matches": [...], "pagination": {...} }
```

#### Get Match Details
```
GET /matches/:matchId
Response: 200
{ "matchId": "match-xxx", "gameMode": "FFA", "status": "COMPLETED", "players": [...] }
```

### Statistics

#### Get User Statistics
```
GET /stats/:userId
Response: 200
{ "eloRating": 1500, "wins": 45, "losses": 20, "winRate": 69.2, "totalMatches": 65 }
```

## WebSocket Events

**Join Queue:** socket.emit('join-queue', { gameMode: 'RANKED', region: 'NA' })
**Game Action:** socket.emit('game-action', { matchId: 'match-xxx', action: 'move', data: {} })
**Server Response:** socket.on('match-started', { matchId, players, startTime })