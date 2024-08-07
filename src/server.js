require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const User = require("./users/model");
const Character = require("./characters/model");

const userRouter = require("./users/routes");
const charRouter = require("./characters/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/char", charRouter);

const syncTables = async () => {
  User.hasMany(Character);
  Character.belongsTo(User);


  await User.sync({ alter: true });
  await Character.sync({ alter: true });
  

  
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Character Vault is listening on port ${port}`);
});
