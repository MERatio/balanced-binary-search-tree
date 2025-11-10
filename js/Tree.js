import * as helpers from './helpers.js';
import Node from './Node.js';

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #uniqueSortedNumbersToBST(numbers, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(numbers[mid]);
    root.left = this.#uniqueSortedNumbersToBST(numbers, start, mid - 1);
    root.right = this.#uniqueSortedNumbersToBST(numbers, mid + 1, end);
    return root;
  }

  #buildTree(arr) {
    if (!helpers.areElementsNumber(arr)) {
      throw new Error('Tree only accepts numbers.');
    }

    const uniqueNumbers = [...new Set(arr)];
    const uniqueSortedNumbers = helpers.sortNumbers(uniqueNumbers);
    return this.#uniqueSortedNumbersToBST(
      uniqueSortedNumbers,
      0,
      uniqueSortedNumbers.length - 1,
    );
  }

  // Print tree sideways.
  static print(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.print(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.print(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

export default Tree;
