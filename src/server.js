require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const sequelize = require("./db/connection");
const User = require("./users/model");
const Character = require("./characters/model");
const Favourite = require("./favourite/model");

const userRouter = require("./users/routes");
const charRouter = require("./characters/routes");
const favRouter = require("./favourite/routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/char", charRouter);
app.use("/favourite", favRouter);

const syncTables = async () => {
  try {
    // Set up relationships
    User.hasMany(Character, { foreignKey: 'userId' });
    Character.belongsTo(User, { foreignKey: 'userId' });

    User.belongsToMany(Character, { 
      through: Favourite, 
      as: 'FavoriteCharacters', 
      foreignKey: 'userId', 
      otherKey: 'characterId' 
    });
    Character.belongsToMany(User, { 
      through: Favourite, 
      as: 'FavoritedBy', 
      foreignKey: 'characterId', 
      otherKey: 'userId' 
    });

    // Sync tables
    await User.sync();
    await Character.sync();
    await Favourite.sync();

    console.log("Tables synced successfully");
  } catch (error) {
    console.error("Error syncing tables:", error);
  }
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Character Vault is listening on port ${port}`);
});