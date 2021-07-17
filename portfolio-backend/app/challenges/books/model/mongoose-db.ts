import mongoose from "mongoose";

export default mongoose.connect(process.env.DB_URL, {
  dbName: process.env.BOOK_DB_NAME,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
