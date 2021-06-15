import express from "express";
const router = express.Router();

router.use("/c3/chat", require("./challenges/c3/chat"));
router.use("/check_flag", require("./challenges/check_flag"));

module.exports = router;
