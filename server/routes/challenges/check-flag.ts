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
    res.send({ success: false });
  } else {
    if (msg === process.env[`FLAG_${id}`]) {
      res.send({ success: true, secret: process.env[`BG_${id}`] });
    } else {
      res.send({ success: false });
    }
  }
});

module.exports = router;
