import express from "express";
const router = express.Router();

router.use("/c3/chat", require("./challenges/c3/chat"));
router.use("/check-flag", require("./challenges/check-flag"));

module.exports = router;
