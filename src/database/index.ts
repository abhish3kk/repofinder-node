import { Sequelize } from "sequelize";

const database = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export default database;
