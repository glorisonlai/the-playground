import { APIGatewayProxyEvent } from "aws-lambda";
import { MessageUtil } from "../../utils/message";

export const FlagsController = {
  async checkFlag(event: APIGatewayProxyEvent) {
    const { msg, id } = JSON.parse(event.body);
    console.log(process.env);
    console.log(process.env[`FLAG_${id}`]);
    try {
      if (
        !msg ||
        !id ||
        !(typeof id === "number") ||
        !msg.match(/^FLAG{[a-zA-Z0-9]*}$/) ||
        !process.env[`FLAG_${id}`]
      ) {
        return MessageUtil.failed();
      }
      if (msg === process.env[`FLAG_${id}`]) {
        const key = process.env[`KEY_${id}`];
        return MessageUtil.success(key);
      }
      return MessageUtil.failed();
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  },
};
