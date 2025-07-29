const bcrypt = require('bcrypt');
const db = require('../server/db.cjs');

const password = 'password123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  const users = [
    { username: 'farmer@agrilink.com', password: hash, user_type: 'farmer' },
    { username: 'customer@agrilink.com', password: hash, user_type: 'consumer' }
  ];

  const query = 'INSERT INTO users (username, password, user_type) VALUES ?';
  db.query(query, [users.map(user => [user.username, user.password, user.user_type])], (err, result) => {
    if (err) {
      console.error('Error seeding users:', err);
    } else {
      console.log('Users seeded successfully');
    }
    db.end();
  });
});
