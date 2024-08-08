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
    console.log("Starting table sync...");

    // Disable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    console.log("Foreign key checks disabled");

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
    console.log("Relationships set up");

    // Sync tables
    console.log("Syncing User table...");
    await User.sync({ alter: true });
    console.log("User table synced");

    console.log("Syncing Character table...");
    await Character.sync({ alter: true });
    console.log("Character table synced");

    console.log("Syncing Favourite table...");
    await Favourite.sync({ alter: true });
    console.log("Favourite table synced");

    // Re-enable foreign key checks
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log("Foreign key checks re-enabled");

    console.log("All tables synced successfully");
  } catch (error) {
    console.error("Error during table sync:", error);
  }
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "API is healthy" });
});

app.listen(port, () => {
  syncTables();
  console.log(`Character Vault is listening on port ${port}`);
});