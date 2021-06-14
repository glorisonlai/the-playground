import express, { Request, Response } from "express";
const router = express.Router();

interface ResponseBody {
  [bgId: string]: boolean;
}

router.get("/", (req: Request, res: Response) => {
  console.log(typeof req.cookies);
  const unlocked = req.cookies;
  console.log("blah");
  const bgs: ResponseBody = {};
  for (const key in unlocked) {
    if (key.match(/^bg[0-9]+$/)) {
      const id = key.split("g")[1];
      if (
        !!process.env[`BG_${id}`] &&
        process.env[`BG_${id}`] === unlocked[key]
      ) {
        bgs[id] = true;
      }
    }
  }
  res.send(bgs);
});

module.exports = router;
