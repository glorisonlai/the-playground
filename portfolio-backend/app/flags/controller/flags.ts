import { MessageUtil } from "../../utils/message";

export const FlagsController = {
  async checkFlag(event: any) {
    const { msg, id } = JSON.parse(event.body);
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
        console.log(key);
        return MessageUtil.success(key);
      }
      return MessageUtil.failed();
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  },
};
