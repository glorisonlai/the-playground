export type BookSearchReq = {
  name: string;
  categories: string[];
};

export type BooksDocument = {
  name: string;
  id: number;
  description: string;
};
