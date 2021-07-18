import { MessageUtil } from "../../../utils/message";
import { CreateBookDTO } from "../model/createBookDTO";

export const BooksController = {
  async searchBookName(event: any) {
    const req = JSON.parse(event.body)

    try {
      const values: string[] = [req.msg];
      const query: string = 'SELECT * FROM books WHERE title LIKE $1'

    } catch(err: ErrorEvent) {
      return MessageUtil.error(err.code, err.message)
    }
  }
  /**
   * Create book
   * @param {*} event
   */
  async create(event: any, context?: Context) {
    console.log("functionName", context.functionName);
    const params: CreateBookDTO = JSON.parse(event.body);

    try {
      const result = await this.createBook({
        name: params.name,
        id: params.id,
      });

      return MessageUtil.success(result);
    } catch (err: Error) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Update a book by id
   * @param event
   */
  async update(event: any) {
    const id: number = Number(event.pathParameters.id);
    const body: object = JSON.parse(event.body);

    try {
      const result = await this.updateBooks(id, body);
      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find book list
   */
  async find() {
    try {
      const result = await this.findBooks();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query book by id
   * @param event
   */
  async findOne(event: any, context: Context) {
    // The amount of memory allocated for the function
    console.log("memoryLimitInMB: ", context.memoryLimitInMB);

    const id: number = Number(event.pathParameters.id);

    try {
      const result = await this.findOneBookById(id);

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete book by id
   * @param event
   */
  async deleteOne(event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneBookById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(
          1010,
          "The data was not found! May have been deleted!"
        );
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
