import * as helpers from './helpers.js';
import Node from './Node.js';
import Queue from './Queue.js';

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

  // Can do it with recursive, but iterative is more efficient.
  find(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return null;
    }

    let cur = this.root;
    while (cur !== null) {
      if (cur.data > value) {
        cur = cur.left;
      } else if (cur.data < value) {
        cur = cur.right;
      } else {
        return cur;
      }
    }

    return null;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback required.');
    }

    if (this.root === null) {
      return;
    }

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const cur = queue.dequeue();
      callback(cur);
      if (cur.left !== null) {
        queue.enqueue(cur.left);
      }
      if (cur.right !== null) {
        queue.enqueue(cur.right);
      }
    }
  }

  preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback required.');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback required.');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback required.');
    }

    function traverse(node) {
      if (node === null) {
        return;
      }
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }

  // Recursion is slightly slower.
  height(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return null;
    }

    const node = this.find(value);
    if (node === null) {
      return null;
    }

    // - 1, because leaf node has 0 height.
    let height = -1;
    const queue = new Queue();
    queue.enqueue(node);

    while (!queue.isEmpty()) {
      let levelSize = queue.length;
      height++; // Increment height on each level.

      for (let i = 0; i < levelSize; i++) {
        let cur = queue.dequeue();
        if (cur.left) {
          queue.enqueue(cur.left);
        }
        if (cur.right) {
          queue.enqueue(cur.right);
        }
      }
    }

    return height;
  }
}

export default Tree;
