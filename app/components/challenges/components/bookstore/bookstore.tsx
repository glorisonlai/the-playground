import { useState } from "react";
import styles from "styles/bookstore.module.scss";
import { ObjectEnum } from "../../../common/ObjectEnum";

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
    if (status === statusCode.NORMAL) {
      if (books.length) {
        return (
          <div className={styles.bookList}>
            {books
              .sort((book1, book2) => book1.id - book2.id)
              .map((book) => (
                <div key={book.id}>
                  {book.name}
                  <div className={styles.categories}>{book.category}</div>
                </div>
              ))}
          </div>
        );
      }
      return (
        <div className={styles.bookList}>
          No Books found! Try searching for something else?
        </div>
      );
    }
    if (status === statusCode.ERROR) {
      return <div className={styles.error}>Something wrong happened!</div>;
    }
    return <div className={styles.bookList}>Search for some Books!</div>;
  };

  const searchBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;
    if (!search && !searchCat.size) return;
    setLoading(true);
<<<<<<< HEAD:client/src/components/challenges/components/bookstore/bookstore.tsx
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/dev/c4/searchbook",
        { name: search, categories: Array.from(searchCat) }
      );
      setStatus(res.status === 200 ? statusCode.NORMAL : statusCode.ERROR);
      setBooks(res.data.data);
    } catch (err: any) {
=======
    const res = await fetch(
      process.env.REACT_APP_API_URL + "/dev/c4/searchbook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: search,
          categories: Array.from(searchCat),
        }),
      }
    );
    console.log(res);
    if (res.status !== 200) {
      // Do error handling here
>>>>>>> backgrounds/challenges:app/components/challenges/components/bookstore/bookstore.tsx
      setStatus(statusCode.ERROR);
    }
<<<<<<< HEAD:client/src/components/challenges/components/bookstore/bookstore.tsx
=======
    setStatus(statusCode.NORMAL);
    setBooks(await res.json());
>>>>>>> backgrounds/challenges:app/components/challenges/components/bookstore/bookstore.tsx
    setLoading(false);
  };

  const searchBookByCategory = (cat: string) => {
    const newCatSearch = new Set(searchCat);
    newCatSearch.has(cat) ? newCatSearch.delete(cat) : newCatSearch.add(cat);
    setSearchCat(newCatSearch);
  };

  return (
    <div className={styles.storefront}>
      <form className={styles.bookSearch} onSubmit={searchBook}>
        <div className={styles.bookLogo}>📕 Books!</div>
        <input
          type="text"
          className={styles.bookSearchInput}
          name="book-title"
          placeholder="Search books"
          value={search}
          onChange={handleChange}
        />
        <input
          className={styles.bookSearchSubmit}
          type="submit"
          value="Search"
        />
      </form>
      <div className={styles.categories}>
        {/* TODO: Make the buttons into a map for readability */}
        {Object.keys(BookCategories).map((key) => (
          <button
            key={key}
            className={
              searchCat.has(BookCategories[key].name) ? styles.selected : ""
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
