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
    this.chain = [this.generateGenesisBlock()];
  }

  generateGenesisBlock() {
    const genesisBlock = new Block("01/01/2023", "Genesis Block", "0000000000");
    return genesisBlock;
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    if (this.chain.length > 0) {
      newBlock.prevHash = this.getLatestBlock().hash;
    }
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isBlockchainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.prevHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
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

jossCoin.addBlock(new Block("02/01/2023", { amount: 10 }, 'abcdef12345'));
jossCoin.addBlock(new Block("03/01/2023", { amount: 20 }, jossCoin.getLatestBlock().hash));

console.log("JossCoin Blockchain:", jossCoin.isBlockchainValid() ? "is valid" : "is not valid");

