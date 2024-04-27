import { authenticateUser } from "../../services/authService.js";
import { verifyRefreshToken } from "../../services/jwtService.js";
import {
  dateTimeHandler,
  sendErrorResponse,
  sendSuccessResponse,
} from "../../utils/globals.js";

class AuthController {
  async login(req, res) {
    const { email, password, staySignedIn, role } = req.body || {};

    const errorMessage = "Failed to authenticate!";

    if (!email || !password) {
      return sendErrorResponse(req, res, 401, errorMessage);
    }

    let expiryTime = "";
    try {
      expiryTime = staySignedIn
        ? dateTimeHandler(15, "daysEnd", "inc")
        : dateTimeHandler(1, "daysEnd", "inc");
    } catch (error) {}

    if (!expiryTime) {
      return null;
    }

    const auth = await authenticateUser(email, password, expiryTime, role);

    if (!auth || !auth.user || !auth.refreshToken || !auth.accessToken) {
      return sendErrorResponse(req, res, 401, errorMessage);
    }

    res.cookie("yttmrtck", auth.refreshToken, {
      httpOnly: true,
      secure: process.env.APP_MODE === "prod" ? true : false,
      sameSite: "Lax",
      path: "/",
      maxAge: expiryTime * 1000,
    });

    req.refreshToken = auth.refreshToken;
    req.accessToken = auth.accessToken;
    req.userData = auth.user;
    req.authenticated = auth.authenticated;

    return sendSuccessResponse(req, res, "Successfully logged in!", auth);
  }

  async verifyTokenController(req, res) {
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
      return sendSuccessResponse(req, res, "Token valid!");
    } else {
      return sendErrorResponse(req, res, 401, "Verification failed!");
    }
  }

  logoutController(req, res) {
    res.clearCookie("yttmrtck");
    return sendSuccessResponse(req, res, "Successfully logged out!");
  }
}

export default AuthController;
