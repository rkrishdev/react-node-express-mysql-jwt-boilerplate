import { sendSuccessResponse } from "../../utils/globals.js";

class MainController {
  dummyDataController(req, res) {
    return sendSuccessResponse(req, res, "Dummy data", ["Kumar", "Siva"]);
  }
}

export default MainController;
