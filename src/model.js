import { DataTypes, Model } from "sequelize";
import util from "util";
import connectToDB from "./db.js";

const db = await connectToDB("postgresql:///animals");

export class Human extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }

  getFullName() {
    return this.fname + " " + this.lname;
  }
}

Human.init(
  {
    humanId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
    },
    fname: {
      type: DataTypes.CHAR,
      notNull: true,
    },
    lname: {
      type: DataTypes.CHAR,
      notNull: true,
    },
    email: {
      type: DataTypes.CHAR,
      notNull: true,
    },
  },
  { sequelize: db, underscored: true, tableName: "humans" }
);

export class Animal extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Animal.init(
  {
    animalId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,
    },
    name: {
      type: DataTypes.CHAR,
      notNull: true,
    },
    species: {
      type: DataTypes.CHAR,
      notNull: true,
    },
    birthYear: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    underscored: true,
    tableName: "animals",
  }
);

Animal.belongsTo(Human, { foreignKey: "humanId" });
Human.hasMany(Animal, { foreignKey: "humanId" });

export default db;
