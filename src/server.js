require('dotenv').config();
const express = require('express');
const cors = require('cors');

const User = require('./users/model');
const Character = require('./characters/model');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ message: "API is healthy" });
})

const syncTables = async () => {
  await User.sync({ alter: true });
  await Character.sync({ alter: true });
}

app.listen(port, () => {
  syncTables();
  console.log(`Character Vault API listening on ${port}`);
});