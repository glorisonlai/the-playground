import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { QueryConfig } from "pg";
import { MessageUtil } from "../../../utils/message";
import { postgresClient } from "../../../utils/postgres";
import { BooksDocument, BookSearchReq } from "../model";

export const BooksController = {
  /**
   * Search book
   * @param {*} event
   */
  async searchBook(
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    const req = JSON.parse(event.body);

    try {
      const { name, categories } = req as BookSearchReq;
      const pgClient = await postgresClient(process.env["POSTGRES_BOOK_URI"]);

      const query: QueryConfig<string[]> = {
        text: `SELECT id,name,category FROM books WHERE name LIKE $1`,
        values: [!!name ? `${name}%` : "%"],
      };

      if (!!categories.length) {
        query.text += " AND false";
        for (const cat of categories) {
          if (
            cat.length > 62 ||
            cat.match(/[*;()]|OR|AND|DROP|OPEN|RENAME|RELEASE|ALTER/)
          ) {
            break;
          }
          query.text += ` OR category='${cat}'`;
        }
      }

      const res = await pgClient.query<BooksDocument>(query);
      pgClient.end();

      return MessageUtil.success(res.rows);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  },
};
