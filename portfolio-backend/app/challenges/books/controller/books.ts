import { MessageUtil } from "../../../utils/message";
import { postgresClient } from "../model";

export const BooksController = {
  /**
   * Create book
   * @param {*} event
   */
  async searchBook(event: any) {
    const req = JSON.parse(event.body);

    try {
      const { name, categories } = req;
      const pgClient = await postgresClient(process.env["POSTGRES_BOOK_DB"]);
      let query = `SELECT name FROM books WHERE name LIKE $1`;
      if (categories.length) {
        query += " AND false";
        for (const cat of categories) {
          if (
            cat.length > 62 ||
            cat.match(/[*;()]|OR|AND|DROP|OPEN|RENAME|RELEASE|ALTER/)
          ) {
            break;
          }
          query += ` OR category='${cat}'`;
        }
      }
      console.log(name);
      const res = await pgClient.query(query, [name + "%"]);
      pgClient.end();
      console.log(res.rows);
      return MessageUtil.success(res.rows);
    } catch (err: any) {
      return MessageUtil.error(err.code, err.message);
    }
  },
};
