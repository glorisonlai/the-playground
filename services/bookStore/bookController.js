import { Book } from "./bookModel.js";
import { queryRows } from "./db.js";

export const getBooks = async (search, categories) => {
  const query = `SELECT * FROM books WHERE title ILIKE '%${search}%' AND category IN (${categories.join(",")})`;
  const booksRaw = await queryRows(query);
  if (!booksRaw) {
    return [];
  }
  return booksRaw.map((book) => Book(book));
};
