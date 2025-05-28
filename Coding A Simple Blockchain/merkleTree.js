// Create Merkle Tree

import crypto from 'crypto';


const CreateHash = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

const CreateMerkleTree = (leaves) => {
  if (leaves.length === 0) return null;

  // Hash the leaves
  const hashedLeaves = leaves.map((leaf) => CreateHash(leaf));

  // Build the tree
  const tree = [hashedLeaves];
  while (tree[tree.length - 1].length > 1) {
    const currentLevel = tree[tree.length - 1];
    const nextLevel = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = currentLevel[i + 1] || left; // If odd, duplicate last hash
      nextLevel.push(CreateHash(left + right));
    }
    tree.push(nextLevel);
  }
  return tree;
};

CreateMerkleTree(['a', 'b', 'c', 'd']);
console.log(CreateMerkleTree(['a', 'b', 'c', 'd']));


