const crypto = require("crypto");

const data = "Blockchain is secure and immutable";

const hash = crypto.createHash('sha256').update(data).digest('hex');

console.log(`Data: ${data}`);
console.log(`SHA-256 Hash: ${hash}`);