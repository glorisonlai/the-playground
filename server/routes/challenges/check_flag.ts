import { Console } from "console";
import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  const { msg, id } = req.body;
  console.log(msg, id);
  if (
    !msg ||
    !id ||
    !msg.match(/^FLAG{[a-zA-Z0-9]*}$/) ||
    !id ||
    !process.env[`FLAG_${id}`]
  ) {
    console.log("blocked");
    console.log(msg.match(/^FLAG{[a-zA-Z0-9]*}$/));
    console.log(!process.env[`FLAG_${id}`]);
    res.send({ success: false });
  } else {
    console.log(msg, process.env[`FLAG_${id}`]);
    if (msg === process.env[`FLAG_${id}`]) {
      res.cookie(`bg${id}`, process.env[`BG_${id}`], {
        maxAge: 900000000,
        httpOnly: true,
      });
      res.send({ success: true });
    } else {
      res.send({ success: false });
    }
  }
});

module.exports = router;
