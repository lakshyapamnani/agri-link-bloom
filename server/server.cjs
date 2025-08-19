const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Provide a fetch implementation in CommonJS if not available (Node < 18)
// Lazy import to avoid hard dependency if global fetch exists
const fetchFn = typeof fetch === 'function'
  ? fetch
  : (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());

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

// Start server (no database required)
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
