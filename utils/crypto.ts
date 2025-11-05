import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY || "my_super_secret_key_123! This is one of the biggest secrets in the world ....its so long that it could be used to encrypt a small novel."; // You can move this to .env

export const encryptData = (data: string) => {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
};

export const decryptData = (cipherText: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (err) {
    console.error("Decryption error:", err);
    return "";
  }
};
