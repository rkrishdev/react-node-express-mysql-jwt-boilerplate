import { sendSuccessResponse } from "../../utils/globals.js";

export const dummyDataController = (req, res) => {
  return sendSuccessResponse(req, res, "Dummy data", ["Kumar", "Siva"]);
};
