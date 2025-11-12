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
