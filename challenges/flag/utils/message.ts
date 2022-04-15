import { ResponseVO } from "./model/responseVo";

enum StatusCode {
  success = 200,
  error = 400,
}

enum DefaultMessages {
  success = "Success!",
  failed = "Something went wrong!",
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: object;

  constructor(
    statusCode: number,
    code: number,
    message: string,
    data?: object
  ) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export const MessageUtil = {
  success(data: Object): ResponseVO {
    const result = new Result(
      StatusCode.success,
      1,
      DefaultMessages.success,
      data
    );

    return result.bodyToString();
  },

  failed(): ResponseVO {
    const result = new Result(StatusCode.success, 0, DefaultMessages.failed);

    return result.bodyToString();
  },

  error(code: number = 1000, message: string): ResponseVO {
    const result = new Result(StatusCode.error, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  },
};
