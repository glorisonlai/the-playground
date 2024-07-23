import mongoose from "mongoose";

export const mongoClient = (dbName: string) =>
  mongoose.connect(process.env.MONGO_DB_URL, {
    dbName,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
