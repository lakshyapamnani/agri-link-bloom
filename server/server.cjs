const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('./db');
require('dotenv').config();

// Provide a fetch implementation in CommonJS if not available (Node < 18)
// Lazy import to avoid hard dependency if global fetch exists
const fetchFn = typeof fetch === 'function'
  ? fetch
  : (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();
const port = 3001;

// Function to execute SQL script
const executeSQLScript = (filePath, callback) => {
  const script = fs.readFileSync(filePath, 'utf8');
  const statements = script.split(/;\s*$/m);

  const executeStatement = (index) => {
    if (index >= statements.length || !statements[index].trim()) {
      if (callback) callback();
      return;
    }

    db.query(statements[index], (err) => {
      if (err) {
        // Ignore "database exists" error
        if (err.code === 'ER_DB_CREATE_EXISTS') {
          console.warn(`Database already exists. Skipping creation.`);
        } else {
          console.error(`Error executing statement: ${statements[index]}`);
          throw err;
        }
      }
      executeStatement(index + 1);
    });
  };

  executeStatement(0);
};


app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const { email, password, userType } = req.body;

  const query = 'SELECT * FROM users WHERE username = ? AND user_type = ?';
  db.query(query, [email, userType], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (isMatch) {
        res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
});

// Proxy route for AI assistant (avoids exposing API keys in the client)
app.post('/ai', async (req, res) => {
  try {
    const { message, model } = req.body || {};
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'A non-empty "message" string is required.' });
    }

    const apiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'AI API key not configured on server.' });
    }

    // Use specified model or default from environment variable
    const modelName = model || process.env.GEMINI_MODEL || 'gemini-1.5-flash-latest';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
    const response = await fetchFn(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: message }]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: 'Upstream AI error', details: errorText });
    }

    const data = await response.json();
    const aiText = Array.isArray(data?.candidates)
      ? data.candidates
          .flatMap(c => (c?.content?.parts || []))
          .map(p => p?.text)
          .filter(Boolean)
          .join('\n')
      : '';

    return res.json({ text: aiText || "I didn't understand that. Could you try again?" });
  } catch (err) {
    console.error('AI proxy error:', err);
    return res.status(500).json({ error: 'AI request failed' });
  }
});

// Initialize DB and start server
db.on('connect', () => {
  console.log('Connected to the database. Initializing schema...');
  executeSQLScript('./db/init.sql', () => {
    console.log('Database schema initialized.');
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });
});
