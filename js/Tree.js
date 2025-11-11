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
    if (!Array.isArray(arr) || !helpers.areElementsNumber(arr)) {
      throw new Error('Tree only accepts an array of numbers.');
    }

    const uniqueNumbers = [...new Set(arr)];
    const uniqueSortedNumbers = helpers.sortNumbers(uniqueNumbers);
    return this.#uniqueSortedNumbersToBST(
      uniqueSortedNumbers,
      0,
      uniqueSortedNumbers.length - 1,
    );
  }

  #printTree(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.#printTree(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.#printTree(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  // Get inorder successor (smallest number in right subtree).
  #getSuccessor(node) {
    let cur = node.right;
    while (cur !== null && cur.left !== null) {
      cur = cur.left;
    }
    return cur;
  }

  #deleteNode(root, value) {
    if (root === null) {
      return null;
    }

    if (root.data > value) {
      root.left = this.#deleteNode(root.left, value);
    } else if (root.data < value) {
      root.right = this.#deleteNode(root.right, value);
    } else {
      // Node with 0 or 1 child. Replace the target node with its child (could null, or a node).
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with 2 children.
      const successor = this.#getSuccessor(root);
      root.data = successor.data;
      // Delete the successor node.
      root.right = this.#deleteNode(root.right, successor.data);
    }

    return root;
  }

  // Print tree sideways.
  print() {
    this.#printTree(this.root);
  }

  // Iterative is more efficient than recursive.
  insert(value) {
    if (typeof value !== 'number') {
      throw new Error('Tree only accepts numbers.');
    }

    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let cur = this.root;
    while (true) {
      if (cur.data > value) {
        if (cur.left === null) {
          cur.left = newNode;
          return;
        }
        cur = cur.left;
      } else if (cur.data < value) {
        if (cur.right === null) {
          cur.right = newNode;
          return;
        }
        cur = cur.right;
      } else {
        // Ignore duplicate.
        return;
      }
    }
  }

  deleteItem(value) {
    this.root = this.#deleteNode(this.root, value);
  }
}

export default Tree;
