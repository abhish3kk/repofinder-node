import bcrypt from "bcryptjs";
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
    },
  },
);

export { UserModel };
