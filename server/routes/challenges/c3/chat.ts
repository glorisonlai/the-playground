import express, { Request, Response } from "express";
import axios from "axios";
const router = express.Router();

router.get("/chat", async (req: Request, res: Response) => {
  const { data, status } = await axios.get(process.env.CHAT_APP!);
  if (status === 200) {
    res.send({ success: true, data: data });
  } else {
    res.send({ success: false });
  }
});

module.exports = router;
