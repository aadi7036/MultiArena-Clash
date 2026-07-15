const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const winston = require('winston');

dotenv.config();

const app = express();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}

app.use(helmet());
app.use(cors({ origin: process.env.WEBSOCKET_CORS_ORIGIN || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/leaderboard', require('./routes/leaderboard'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/stats', require('./routes/stats'));

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

module.exports = app;