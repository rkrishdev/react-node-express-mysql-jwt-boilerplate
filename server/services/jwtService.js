import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import {
  cryptoAESDecryption,
  cryptoAESEncryption,
} from "./encryptionService.js";
import { getUserByUserId } from "../models/AuthModel.js";
import { convertToRoleData } from "../utils/globals.js";

const rootDir = process.cwd();
const privateKeyPath = path.join(rootDir, "/certs/jwtRS256.key");
const publicKeyPath = path.join(rootDir, "/certs/jwtRS256.key.pub");
const privateKey = await fs.readFile(privateKeyPath);
const publicKey = await fs.readFile(publicKeyPath);

export const sign = async (data, seconds = 30 * 60 * 60 * 24) => {
  if (!data) {
    return null;
  }

  try {
    const options = { algorithm: "RS256", expiresIn: seconds };
    const token = jwt.sign({ payload: data }, privateKey, options);
    return token;
  } catch (error) {
    /* console.error(error); */
    return null;
  }
};

export const verifyToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, publicKey, { algorithm: "RS256" });
  } catch (error) {
    /* console.error(error); */
    return null;
  }
};

export const verifyRefreshToken = async (req) => {
  let userData = null;
  const responseData = {
    authStatus: 0,
    updatedToken: false,
    data: {
      accessToken: null,
      userData: null,
    },
  };

  let accessTok =
    req.headers?.authorization && req.headers?.authorization.split(" ")[1]
      ? req.headers?.authorization.split(" ")[1]
      : "";
  const refreshTok = req.cookies?.yttmrtck;

  if (!accessTok && !refreshTok) {
    return responseData;
  }

  const accessTokenValid = verifyToken(accessTok);

  if (!accessTokenValid || !accessTokenValid.payload) {
    const refreshTokenValid = verifyToken(refreshTok);
    if (refreshTokenValid && refreshTokenValid.payload) {
      const userDec = await cryptoAESDecryption(
        refreshTokenValid.payload
      ).catch(() => null);
      if (userDec) {
        const user = await getUserByUserId(userDec);
        if (user) {
          const userData = {
            id: user.u_user_id,
            name: user.u_name,
            email: user.u_email,
            mobile: user.u_mobile,
            image: user.u_image,
            role: user.u_role ? convertToRoleData(user.u_role) : "User",
            roleValue: user.u_role ? user.u_role : 0,
          };
          const encUser = await cryptoAESEncryption(
            JSON.stringify(userData)
          ).catch(() => null);
          //2 minutes
          const accessToken = await sign(encUser, 2 * 60).catch(() => null);
          responseData.updatedToken = true;
          responseData.authStatus = 1;
          responseData.data.accessToken = accessToken;
          responseData.data.userData = userData;
          return responseData;
        }
      }
    }
  } else {
    userData = await cryptoAESDecryption(accessTokenValid.payload).catch(
      () => null
    );
  }

  if (accessTokenValid && userData) {
    responseData.authStatus = 1;
    responseData.data.accessToken = accessTok;
    responseData.data.userData = userData;
  }

  return responseData;
};
