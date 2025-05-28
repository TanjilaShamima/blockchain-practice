
const { createSign, createVerify } = require('crypto');
const { privateKey, publicKey } = require('./public-private-key');

const message = 'Blockchain is secure and immutable';

// signature creation
const signer = createSign('sha256');
signer.update(message);
signer.end();

const signature = signer.sign(privateKey, 'hex');
console.log(`Signature: ${signature}`);

// signature verification
const verifier = createVerify('sha256');
verifier.update(message);
verifier.end();
const isVerified = verifier.verify(publicKey, signature, 'hex');
console.log(`Is the signature verified? ${isVerified}`);