import express from "express";
import {
  login,
  logoutController,
  verifyTokenController,
} from "../../../controllers/api/AuthController.js";

const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.post("/login", login);

router.get("/verifyToken", verifyTokenController);

router.get("/logout", logoutController);

router.get("*", function (req, res) {
  res.status(404).json({
    success: false,
    message: "",
    data: null,
    error: {
      code: 404,
      message: "Page not found!",
    },
  });
});

export default router;
