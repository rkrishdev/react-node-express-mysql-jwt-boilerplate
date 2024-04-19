import bcrypt from "bcrypt";
import { sign } from "./jwtService.js";
import { cryptoAESEncryption } from "./encryptionService.js";
import { getUserByEmail } from "../models/AuthModel.js";

export async function authenticateUser(email, password, expiryTime) {
  if (!email || !password || !expiryTime) {
    return null;
  }

  try {
    const user = await getUserByEmail(email);
    const dbHash = user.u_password;

    if (user.u_email !== email || !dbHash) {
      return null;
    }

    //to compare php hash
    const hash = dbHash.replace(/^\$2y(.+)$/i, "$2b$1");
    const verified = await bcrypt.compare(password, hash).catch(() => false);

    if (!verified) {
      return null;
    }

    const userData = {
      id: user.u_user_id,
      name: user.u_name,
      email: user.u_email,
      mobile: user.u_mobile,
      image: user.u_image,
    };

    const encUser = await cryptoAESEncryption(JSON.stringify(userData)).catch(
      () => null
    );
    const encUserId = await cryptoAESEncryption(user.u_user_id).catch(
      () => null
    );
    //1 day
    const refreshToken = await sign(encUserId, expiryTime).catch(() => null);
    //2 minutes
    const accessToken = await sign(encUser, 2 * 60).catch(() => null);

    return {
      refreshToken: refreshToken,
      accessToken: accessToken,
      user: userData,
      authenticated: true,
    };
  } catch (error) {
    return null;
  }
}
