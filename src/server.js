require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ message: "API is healthy" });
})

app.listen(port, () => {
  console.log(`Character Vault API listening on ${port}`);
});