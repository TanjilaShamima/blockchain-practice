const {
  generateKeyPairSync,
  privateDecrypt,
  publicEncrypt,
} = require("crypto");

export const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

const data = "Blockchain is secure and immutable";

// Log the generated keys
console.log("Public Key:\n", publicKey);
console.log("Private Key:\n", privateKey);

// Encrypt the data using the public key
const encryptedData = publicEncrypt(publicKey, Buffer.from(data));

// Decrypt the data using the private key
const decryptedData = privateDecrypt(privateKey, encryptedData).toString();

console.log(`Original Data: ${data}`);
console.log(`Encrypted Data: ${encryptedData.toString("base64")}`);
console.log(`Decrypted Data: ${decryptedData}`);
