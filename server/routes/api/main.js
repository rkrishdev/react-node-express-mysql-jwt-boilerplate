import express from "express";
import { dummyDataController } from "../../controllers/api/MainController.js";
import { verifyTokenMiddleware } from "../../middlewares/tokenMiddleware.js";

const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get("/dummydata", verifyTokenMiddleware, dummyDataController);

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
