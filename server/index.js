import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { initializeDevEnvironment } from './init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database initialization
let db;

async function initializeDatabase() {
  try {
    const dbPath = join(__dirname, 'db', 'chess.db');
    db = new Database(dbPath);
    console.log('Connected to SQLite database');

    // Initialize schema
    const schemaPath = join(__dirname, 'db', 'scema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema);
    console.log('Database schema initialized');

    return db;
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

// Helper functions for database operations
function dbRun(query, params = []) {
  const result = db.prepare(query).run(...params);
  return { id: Number(result.lastInsertRowid), changes: result.changes };
}

function dbGet(query, params = []) {
  return db.prepare(query).get(...params);
}

function dbAll(query, params = []) {
  return db.prepare(query).all(...params);
}

// Routes - Stub implementations

// Get all games
app.get('/api/games', async (req, res) => {
  try {
    const games = await dbAll('SELECT * FROM games ORDER BY created_at DESC');
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Create a new game
app.post('/api/games', async (req, res) => {
  try {
    const gameId = uuidv4();
    const { whitePlayer = 'Human', blackPlayer = 'AI' } = req.body;
    
    await dbRun(
      'INSERT INTO games (id, white_player, black_player) VALUES (?, ?, ?)',
      [gameId, whitePlayer, blackPlayer]
    );

    const game = await dbGet('SELECT * FROM games WHERE id = ?', [gameId]);
    res.status(201).json(game);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Get specific game
app.get('/api/games/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await dbGet('SELECT * FROM games WHERE id = ?', [gameId]);
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const moves = await dbAll('SELECT * FROM moves WHERE game_id = ? ORDER BY id', [gameId]);
    res.json({ ...game, moves });
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ error: 'Failed to fetch game' });
  }
});

// Make a move (stub)
app.post('/api/games/:gameId/moves', async (req, res) => {
  try {
    const { gameId } = req.params;
    const { from, to, promotion, fenPosition } = req.body;

    // TODO: Validate move, update game state, trigger AI move
    
    await dbRun(
      'INSERT INTO moves (game_id, from_square, to_square, promotion, fen_position) VALUES (?, ?, ?, ?, ?)',
      [gameId, from, to, promotion || null, fenPosition]
    );

    res.json({ success: true, message: 'Move recorded' });
  } catch (error) {
    console.error('Error making move:', error);
    res.status(500).json({ error: 'Failed to make move' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
  try {
    await initializeDevEnvironment();
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`\n✓ Server is running on port ${PORT}`);
      console.log(`✓ API available at http://localhost:${PORT}/api`);
      console.log(`✓ Health check: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
