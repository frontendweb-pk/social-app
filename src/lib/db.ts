import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) throw new Error("MONGODB_URL can not be empty!");

let catche = global.mongoose;

if (!catche) {
  catche = global.mongoose = { conn: null };
}
console.log(MONGODB_URI);

export const connectDb = async () => {
  if (catche.conn) {
    console.log("Database connected from catche!");
    return catche.conn;
  }
  try {
    catche.conn = await mongoose.connect(MONGODB_URI);
    console.log("Database connected!");
    return catche.conn;
  } catch (error) {
    console.log("Mongodb error: ", error);
  }
};
