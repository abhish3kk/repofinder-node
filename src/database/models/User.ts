import { DataTypes, Model } from "sequelize";
import database from "..";

class UserModel extends Model {
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare username: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly modifiedAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    tableName: "users",
    timestamps: true,
  },
);

export { UserModel };
