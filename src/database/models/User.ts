import bcrypt from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import database from "..";
import { GitHubOrder, GitHubSort, GitHubStars, Settings } from "./Settings";
class UserModel extends Model {
  declare id: number;
  declare firstname: string;
  declare lastname: string;
  declare username: string;
  declare password: string;
  declare readonly createdAt: Date;
  declare readonly modifiedAt: Date;

  static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  static async verifyPassword(inputPassword: string, storedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, storedPassword);
  }
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
    hooks: {
      beforeCreate: async (user: UserModel) => {
        user.password = await UserModel.hashPassword(user.password);
      },
      afterCreate: async (user: UserModel) => {
        await Settings.create({
          userId: user.id,
          topics: "",
          perPage: 5,
          languages: "",
          starGazers: GitHubStars.Between50And100,
          sort: GitHubSort.Updated,
          order: GitHubOrder.Descending,
        });
      },
    },
  },
);

export { UserModel };
