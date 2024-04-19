import { verifyRefreshToken } from "../services/jwtService.js";
import { sendErrorResponse } from "../utils/globals.js";

export const verifyTokenMiddleware = async (req, res, next) => {
  const isVerified = await verifyRefreshToken(req);
  if (
    isVerified &&
    isVerified.authStatus === 1 &&
    isVerified.data.accessToken &&
    isVerified.data.userData
  ) {
    if (isVerified.updatedToken) {
      req.accessToken = isVerified.data.accessToken;
      req.userData = isVerified.data.userData;
    }
    next();
  } else {
    return sendErrorResponse(req, res, 401, "Verification failed!");
  }
};

export const verifyTokenForStatic = async (req) => {
  const isVerified = await verifyRefreshToken(req);
  if (
    isVerified &&
    isVerified.authStatus === 1 &&
    isVerified.data.accessToken &&
    isVerified.data.userData
  ) {
    if (isVerified.updatedToken) {
      req.accessToken = isVerified.data.accessToken;
      req.userData = isVerified.data.userData;
    }
    return true;
  } else {
    return null;
  }
};
