import  { createSign, createVerify, generateKeyPairSync }  from "crypto";
const transaction = {
  from: "tanjila",
  to: "imam",
  amount: 100,
};

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

// sign it with private key
const sign = createSign("sha256");
sign.update(JSON.stringify(transaction));
sign.end();

const signature = sign.sign(privateKey, "hex");
console.log("Signature:", signature);

// verify it with public key
const verify = createVerify("sha256");
verify.update(JSON.stringify(transaction));
verify.end();

const isVerified = verify.verify(publicKey, signature, "hex");
console.log("Is the transaction verified?", isVerified);
