import { Role } from "./role";
import { User } from "./user";
import { Post } from "./post";

Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export { Role, User, Post };
