/**
 * @param {Object} source book
 * @returns {Object} Book
 */
export const Book = (book) => ({
  title: book.title,
  cats: book.cats,
  desc: book.desc,
});
