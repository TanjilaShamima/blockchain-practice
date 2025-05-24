const { SHA256 } = require("crypto-js");

class Block {
  constructor(timestamp, data, prevHash) {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const hash = SHA256(
      this.timestamp + JSON.stringify(this.data) + this.prevHash
    ).toString();
    return hash;
  }
}

class Blockchain {
  constructor() {
    this.chain = [];
  }

  addBlock(newBlock){
    // if (this.chain.length > 0) {
    //   newBlock.prevHash = this.chain[this.chain.length - 1].hash;
    // }
    // newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

const block1 = new Block("01/01/2023", { amount: 4 }, "abcdef12345");
// const block2 = new Block("02/01/2023", { amount: 10 }, block1.hash);
// const block3 = new Block("03/01/2023", { amount: 20 }, block2.hash);

// const blockchain = [block1, block2, block3];
// console.log("Blockchain:", blockchain);
// blockchain.forEach((block, index) => {
//   console.log(`Block ${index + 1}:`);
//   console.log(`Timestamp: ${block.timestamp}`);
//   console.log(`Data: ${JSON.stringify(block.data)}`);
//   console.log(`Previous Hash: ${block.prevHash}`);
//   console.log(`Hash: ${block.hash}`);
//   console.log("-------------------------");
// });



// Create a simple blockchain with the blocks
const jossCoin = new Blockchain();
jossCoin.addBlock(block1);

console.log("JossCoin Blockchain:", jossCoin);

