import crypto from "crypto";

export async function cryptoAESEncryption(text) {
  try {
    if (text) {
      const algorithm = "aes-256-cbc";
      const key = crypto.scryptSync(
        process.env.AES_ENC_KEY,
        "salt",
        parseInt(process.env.AES_ENC_SALT)
      );
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      let encrypted = cipher.update(text, "utf8", "hex");
      encrypted += cipher.final("hex");
      return `i$${iv.toString("hex")}$e$${encrypted}`;
    }
  } catch (error) {
    console.error(`Error Enc: ${error.message}`);
  }
  return null;
}

export async function cryptoAESDecryption(encrypted) {
  try {
    if (encrypted) {
      const parts = encrypted.split("$");
      if (parts.length === 4 && parts[0] === "i" && parts[2] === "e") {
        const iv = Buffer.from(parts[1], "hex");
        const encryptedData = parts[3];
        const algorithm = "aes-256-cbc";
        const key = crypto.scryptSync(
          process.env.AES_ENC_KEY,
          "salt",
          parseInt(process.env.AES_ENC_SALT)
        );
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        let decrypted = decipher.update(encryptedData, "hex", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
      } else {
        throw new Error("An error occurred while decrypting the data");
      }
    }
  } catch (error) {
    console.error(`Error Enc: ${error.message}`);
  }
  return null;
}
