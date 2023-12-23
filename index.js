require('dotenv').config();
const express = require('express');
const { setupBot } = require('./utils/bot');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Cryptocurrency Wallet Monitor Bot is running...');
});

// app.post('/api', require('./api'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  setupBot();
});
