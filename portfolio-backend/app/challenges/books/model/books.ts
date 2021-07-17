import mongoose from "mongoose";

export type BooksDocument = mongoose.Document & {
  name: string;
  id: number;
  description: string;
};

const booksSchema = new mongoose.Schema({
  name: String,
  id: { type: Number, index: true, unique: true },
  contents: String,
});

// Note: OverwriteModelError: Cannot overwrite `Books` model once compiled. error
export const books =
  mongoose.models.books ||
  mongoose.model<BooksDocument>(
    "books",
    booksSchema,
    process.env.DB_BOOKS_COLLECTION
  );
