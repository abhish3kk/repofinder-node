import { DataTypes, Model } from "sequelize";
import database from "..";
import { UserModel } from "./User";

export enum GitHubSort {
  Stars = "stars",
  Forks = "forks",
  Updated = "updated",
  BestMatch = "",
}

export enum GitHubOrder {
  Ascending = "asc",
  Descending = "desc",
}

export enum GitHubStars {
  LessThan50 = "stars:<50",
  Between50And100 = "stars:50..100",
  Between100And500 = "stars:100..500",
  Between500And1000 = "stars:500..1000",
  Between1000And5000 = "stars:1000..5000",
  Between5000And10000 = "stars:5000..10000",
  MoreThan10000 = "stars:>10000",
}

class Settings extends Model {
  declare id: number;
  declare topics: string;
  declare perPage: number;
  declare starGazers: GitHubStars;
  declare sort: GitHubSort;
  declare order: GitHubOrder;
  declare userId: number;
  declare languages: string;
}

Settings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    topics: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    perPage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    starGazers: {
      type: DataTypes.ENUM(...Object.values(GitHubStars)),
      allowNull: true,
    },
    sort: {
      type: DataTypes.ENUM(...Object.values(GitHubSort)),
      allowNull: true,
    },
    order: {
      type: DataTypes.ENUM(...Object.values(GitHubOrder)),
      allowNull: true,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "id",
      },
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: database,
    tableName: "settings",
  },
);
UserModel.hasOne(Settings, {
  foreignKey: "userId",
  as: "settings",
  onDelete: "CASCADE",
});

Settings.belongsTo(UserModel, {
  foreignKey: "userId",
});
export { Settings };
