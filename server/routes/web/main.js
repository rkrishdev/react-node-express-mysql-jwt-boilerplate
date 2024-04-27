import express from "express";
import WebController from "../../controllers/WebController.js";

const webController = new WebController();

const router = express.Router();

router.get("/", webController.index);

router.get("*", function (req, res) {
  res.send("404 not found");
});

export default router;
