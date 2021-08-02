import axios from "axios";
import React, { useState } from "react";
import "./bookstore.css";
import { ObjectEnum } from "../../../common/ObjectEnum";

/**
 * Class is an enum of all book categories
 */
// class BookCategories {
//   static readonly FACTS = new BookCategories("Facts", "🤓");
//   static readonly FUNNY = new BookCategories("Funny", "😆");
//   static readonly ROMANCE = new BookCategories("Romance", "💗");
//   static readonly SPOOKY = new BookCategories("Spooky", "👻");
//   static readonly FLAG = new BookCategories("Flag", "🚩");

//   private constructor(readonly key: string, readonly emoji: string) {}
// }
interface BookCategoryInterface {
  readonly name: string;
  readonly icon: string;
}

const BookCategories: ObjectEnum<BookCategoryInterface> = {
  FACTS: { name: "Facts", icon: "🤓" },
  FUNNY: { name: "Funny", icon: "😆" },
  ROMANCE: { name: "Romance", icon: "💗" },
  SPOOKY: { name: "Spooky", icon: "👻" },
  FLAG: { name: "Flag", icon: "🚩" },
};

enum statusCode {
  NORMAL = 0,
  ERROR = 1,
  INITIAL = 2,
}

interface BookInterface {
  readonly id: number;
  readonly name: string;
  readonly category: string;
}

/**
 * Render book store app
 * Sends search/category text to search Postgres DB.
 * TODO: Handle cat:blah token as a union search
 * @returns Book store app
 */
const BookStore = () => {
  const [search, setSearch] = useState("");
  const [searchCat, setSearchCat] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<BookInterface[]>([]);
  const [status, setStatus] = useState<statusCode>(statusCode.INITIAL);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const BookPane = () => {
    console.log(status);
    if (status === statusCode.NORMAL) {
      if (books.length) {
        return (
          <div className="book-list">
            {books
              .sort((book1, book2) => book1.id - book2.id)
              .map((book) => (
                <div key={book.id}>
                  {book.name}
                  <div className="book-cat">{book.category}</div>
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

  const searchBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!search && !searchCat.size) return;
    setLoading(true);
    const res = await axios.post(
      process.env.REACT_APP_API_URL + "/dev/c4/searchbook",
      { name: search, categories: Array.from(searchCat) }
    );
    console.log(res);
    if (res.status !== 200) {
      // Do error handling here
      setStatus(statusCode.ERROR);
      return;
    }
    setStatus(statusCode.NORMAL);
    setBooks(res.data.data);
    setLoading(false);
  };

  const searchBookByCategory = (cat: string) => {
    const newCatSearch = new Set(searchCat);
    newCatSearch.has(cat) ? newCatSearch.delete(cat) : newCatSearch.add(cat);
    setSearchCat(newCatSearch);
  };

  return (
    <div id="storefront">
      <form id="book-search" onSubmit={searchBook}>
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
        {/* TODO: Make the buttons into a map for readability */}
        {Object.keys(BookCategories).map((key) => (
          <button
            key={key}
            className={
              searchCat.has(BookCategories[key].name) ? "selected" : ""
            }
            onClick={() => searchBookByCategory(BookCategories[key].name)}
          >
            <div>{BookCategories[key].icon}</div>
            {BookCategories[key].name}
          </button>
        ))}
      </div>
      <hr />
      <BookPane />
    </div>
  );
};

export default BookStore;
