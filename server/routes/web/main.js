import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.send("Landing page");
});

router.get("*", function (req, res) {
  res.send("404 not found");
});

export default router;
