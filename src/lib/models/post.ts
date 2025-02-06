import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

enum Status {
  DRAFT = "draft",
  PRIVATE = "private",
  PUBLISH = "publish",
  FRIENDS = "friends",
}
export class Post extends Model {
  public post_id!: number;
  public content!: string;
  public user_id!: number;
  public media!: object;
  public status!: Status;
  public created_at!: Date;
  public updated_at!: Date;
}

Post.init(
  {
    post_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.STRING, allowNull: false },
    media: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true,
      defaultValue: null,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "user_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(Status),
      allowNull: false,
      defaultValue: Status.DRAFT,
    },
    created_at: { type: DataTypes.DATE, allowNull: false },
    updated_at: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize: sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
