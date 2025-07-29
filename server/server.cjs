const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const fs = require('fs');
const db = require('./db');

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
