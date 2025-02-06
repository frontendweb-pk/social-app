import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import { Password } from "../password";

const indiaMobileRegex = /^(?:\+91|91)?[789]\d{9}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export class User extends Model {
  public declare user_id: number;
  public declare first_name: string;
  public declare last_name: string;
  public declare email: string;
  public declare password: string;
  public declare mobile: string;
  public declare role_id: number;
  public declare avatar: object;
  public declare active: boolean;
  public declare access_token: string;
  public declare email_verified: boolean;
  public declare created_at: Date;
  public declare updated_at: Date;
}

User.init(
  {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: passwordRegex },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { is: indiaMobileRegex },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "roles", key: "role_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    avatar: { type: DataTypes.JSON, allowNull: true, defaultValue: null },
    access_token: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["email", "mobile"] }],
    hooks: {
      async beforeCreate(user: User) {
        const password = await Password.hash(user.password);
        user.password = password;
      },
      async beforeUpdate(user: User) {
        if (user.changed("password")) {
          const password = await Password.hash(user.password);
          user.password = password;
        }
      },
    },
  }
);
