import Tree from './js/Tree.js';

const numbers = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(numbers);
Tree.print(tree.root);

// Test .insert()
console.log('--- Insert 67, but 67 already in the tree ---');
tree.insert(67);
Tree.print(tree.root);

console.log('--- Insert 75 ---');
tree.insert(75);
Tree.print(tree.root);
