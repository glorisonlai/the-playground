import { Handler, Context } from "aws-lambda";
import dotenv from "dotenv";
import path from "path";
const dotenvPath = path.join(
  __dirname,
  "../",
  `config/.env.${process.env.NODE_ENV}`
);
dotenv.config({
  path: dotenvPath,
});

import { FlagsController } from "./flags/controller/flags";
import { BooksController } from "./challenges/books/controller/books";

// Main function
export const checkFlag: Handler = (event: any) =>
  FlagsController.checkFlag(event);

// Book functions
export const searchBookName: Handler = (event: any) => BooksController.searchBookName;

export const searchBookCategory: Handler = (event: any) => 

// import { books } from "./books/model";
// import { BooksController } from "./books/controller/books";
// const booksController = new BooksController(books);

// export const create: Handler = (event: any, context: Context) => {
//   return booksController.create(event, context);
// };

// export const update: Handler = (event: any) => booksController.update(event);

// export const find: Handler = () => booksController.find();

// export const findOne: Handler = (event: any, context: Context) => {
//   return booksController.findOne(event, context);
// };

// export const deleteOne: Handler = (event: any) =>
//   booksController.deleteOne(event);
