import { MessageUtil } from "../../utils/message";

export const FlagsController = {
  async checkFlag(event: any) {
    const { msg, id } = JSON.parse(event.body);
    if (
      !msg ||
      !id ||
      !msg.match(/^FLAG{[a-zA-Z0-9]*}$/) ||
      !process.env[`FLAG_${id}`]
    ) {
      return MessageUtil.failed();
    }
    return msg === process.env[`FLAG_${id}`]
      ? MessageUtil.success(process.env[`BG_${id}`])
      : MessageUtil.failed();
  },
};
