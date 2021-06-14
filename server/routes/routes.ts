import express, { Request, Response } from "express";
const router = express.Router();

router.use("/check_bg", require("./challenges/check_bg"));
router.use("/check_flag", require("./challenges/check_flag"));

module.exports = router;
