import express from "express";
import MainController from "../../controllers/api/MainController.js";

const mainController = new MainController();

const router = express.Router();
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.get("/dummydata", mainController.dummyDataController);

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
