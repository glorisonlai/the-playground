import { MessageUtil } from "../../utils/message";

export const FlagsController = {
  async checkFlag(event: any) {
    const { flag, id } = JSON.parse(event.body);
    console.log(flag, id);
    try {
      if (
        !flag ||
        !id ||
        !(typeof id === "number") ||
        !flag.match(/^FLAG{[a-zA-Z0-9]*}$/) ||
        !process.env[`FLAG_${id}`]
      ) {
        console.log(
          !flag,
          !id,
          !(typeof id === "number"),
          !flag.match(/^FLAG{[a-zA-Z0-9]*}$/),
          process.env
        );
        return MessageUtil.failed();
      }
      console.log(`FLAG_${id}`, process.env[`FLAG_${id}`]);
      console.log(`KEY_${id}`, process.env[`KEY_${id}`]);
      if (flag === process.env[`FLAG_${id}`]) {
        const key = process.env[`KEY_${id}`];
        return MessageUtil.success(key);
      }
      return MessageUtil.failed();
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  },
  async checkRoute(event: any) {
    console.log("helo");
    return MessageUtil.success("YES");
  },
};
