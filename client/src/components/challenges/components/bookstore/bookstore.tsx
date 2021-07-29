import axios from "axios";
import React, { useState } from "react";
import "./bookstore.css";

/**
 * Class is an enum of all book categories
 */
class BookCategories {
  static readonly FUNNY = new BookCategories("Funny", "😆");
  static readonly SPOOKY = new BookCategories("Spooky", "👻");
  static readonly ROMANCE = new BookCategories("Romance", "💗");
  static readonly FLAG = new BookCategories("Flag", "🚩");

  private constructor(readonly key: string, readonly emoji: string) {}
}

enum statusCode {
  NORMAL = 0,
  ERROR = 1,
  INITIAL = 2,
}

interface BookInterface {
  id: number;
  title: string;
  price: number;
  categories: string[];
}

/**
 * Render book store app
 * Sends search/category text to search Postgres DB.
 * TODO: Handle cat:blah token as a union search
 * @returns Book store app
 */
const BookStore = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [status, setStatus] = useState<statusCode>(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const BookPane = () => {
    if (status === statusCode.NORMAL) {
      if (books.length) {
        return (
          <div className="book-list">
            {books.map((book) => (
              <div>
                {book.title}
                <div className="book-cat">{book.categories.join(", ")}</div>
                <div className="buy-btn">{book.price}</div>
              </div>
            ))}
          </div>
        );
      }
      return (
        <div className="book-list">
          No Books found! Try searching for something else?
        </div>
      );
    }
    if (status === statusCode.ERROR) {
      return <div id="error">Something wrong happened!</div>;
    }
    return <div className="book-list">Search for some Books!</div>;
  };

  const searchBookByName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search, loading);
    if (loading) return;
    if (!search) return;
    setLoading(true);
    const res = await axios.post(
      process.env.REACT_APP_API_URL + "/c4/searchbook",
      { msg: search }
    );
    if (res.status !== 200) {
      // Do error handling here
      setStatus(0);
      return;
    }
    setStatus(1);
    setBooks(JSON.parse(res.data));
    setLoading(false);
  };

  const searchBookByCategory = async (cat: string) => {
    if (loading) return;
    setLoading(true);
    setSearch(`cat:${cat}`);
    const res = await axios.post(
      process.env.REACT_APP_API_URL + "/c4/searchcat",
      { msg: cat }
    );
    if (res.status !== 200) {
      // Error handling
      setStatus(0);
      return;
    }
    setStatus(1);
    setBooks(JSON.parse(res.data));
    setLoading(false);
  };

  return (
    <div id="storefront">
      <form id="book-search" onSubmit={searchBookByName}>
        <div id="book-logo">📕 Books!</div>
        <input
          type="text"
          id="book-search-text"
          name="book-title"
          placeholder="Search books"
          value={search}
          onChange={handleChange}
        />
        <input id="book-search-submit" type="submit" value="Search" />
      </form>
      <div className="icons categories">
        <button onClick={() => searchBookByCategory(BookCategories.FUNNY.key)}>
          <div>{BookCategories.FUNNY.emoji}</div>
          {BookCategories.FUNNY.key}
        </button>
        <button
          onClick={() => searchBookByCategory(BookCategories.ROMANCE.key)}
        >
          <div>{BookCategories.ROMANCE.emoji}</div>
          {BookCategories.ROMANCE.key}
        </button>
        <button onClick={() => searchBookByCategory(BookCategories.SPOOKY.key)}>
          <div>{BookCategories.SPOOKY.emoji}</div>
          {BookCategories.SPOOKY.key}
        </button>
        <button onClick={() => searchBookByCategory(BookCategories.FLAG.key)}>
          <div>{BookCategories.FLAG.emoji}</div>
          {BookCategories.FLAG.key}
        </button>
      </div>
      <hr />
      <BookPane />
    </div>
  );
};

export default BookStore;
