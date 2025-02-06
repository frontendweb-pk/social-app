import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

export class Role extends Model {
  public role_id!: number;
  public role_name!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Role.init(
  {
    role_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    role_name: { type: DataTypes.STRING, allowNull: false, unique: true },
    active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [{ unique: true, fields: ["role_name"] }],
  }
);
