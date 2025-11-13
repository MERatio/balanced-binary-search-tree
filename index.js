import Tree from './js/Tree.js';

const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(numbers);
tree.print();

// Test .insert()
console.log('--- Insert 67, but 67 already in the tree ---');
tree.insert(67);
tree.print();

console.log('--- Insert 75 ---');
tree.insert(75);
tree.print();

// Test .deleteItem()
console.log('--- Delete nothing ---');
tree.deleteItem(9000);
tree.print();

console.log('--- Delete 75 ---');
tree.deleteItem(75);
tree.print();

console.log('--- Delete 8 (root node), replaced by 9 ---');
tree.deleteItem(8);
tree.print();

// Test .find()
console.log('--- Find nothing ---');
console.log(tree.find(8));

console.log('--- Find 67 ---');
console.log(tree.find(67));

// Test .levelOrderForEach()
console.log('--- Level order log ---');
const values1 = [];
tree.levelOrderForEach((node) => values1.push(node.data));
console.log(values1.join(' '));

// Test .preOrderForEach()
console.log('--- Pre-order log ---');
const values2 = [];
tree.preOrderForEach((node) => values2.push(node.data));
console.log(values2.join(' '));

// Test .inOrderForEach()
console.log('--- Inorder log ---');
const values3 = [];
tree.inOrderForEach((node) => values3.push(node.data));
console.log(values3.join(' '));

// Test .postOrderForEach()
console.log('--- Post-order log ---');
const values4 = [];
tree.postOrderForEach((node) => values4.push(node.data));
console.log(values4.join(' '));

// Test height()
console.log('--- Get height of nothing ---');
console.log(tree.height(9000));

console.log('--- Get height of root node ---');
console.log(tree.height(9));

console.log('--- Get height of leaf node ---');
console.log(tree.height(6345));

// Test depth()
console.log('--- Get depth of nothing ---');
console.log(tree.depth(9000));

console.log('--- Get depth of root node---');
console.log(tree.depth(9));

console.log('--- Get depth of leaf node ---');
console.log(tree.depth(6345));

// Check isBalanced()
console.log('Test isBalanced?', tree.isBalanced());

console.log('--- Add more node so the tree will be unbalanced. ---');
for (let i = 101; i <= 105; i++) {
  tree.insert(i);
}

console.log('Test isBalanced?', tree.isBalanced());
tree.print();

// Check rebalance()
console.log('--- Rebalancing ---');
tree.rebalance();
console.log('Test isBalanced?', tree.isBalanced());
tree.print();
