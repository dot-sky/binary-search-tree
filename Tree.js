import { Node } from "./Node.js";
export class Tree {
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array.sort((a, b) => a - b);

    const newArr = []; // duplicate free array
    let j;
    let i = 0;
    while (i < array.length) {
      j = i + 1;
      while (j < array.length && array[i] === array[j]) {
        j++;
      }
      newArr.push(array[i]);
      i = j;
    }

    return this.buildFromArray(newArr, 0, newArr.length - 1);
  }

  buildFromArray(arr, start, end) {
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = this.buildFromArray(arr, start, mid - 1);
    node.right = this.buildFromArray(arr, mid + 1, end);

    return node;
  }

  insert(value) {
    this.insertTo(this.root, value);
  }

  insertTo(node, value) {
    if (node === null || node.data === value) return;

    if (value < node.data) {
      if (node.left === null) node.left = new Node(value);
      else this.insertTo(node.left, value);
    } else {
      if (node.right === null) node.right = new Node(value);
      else this.insertTo(node.right, value);
    }
  }

  deleteItem(value) {
    this.delete(this.root, value, null);
  }

  delete(node, value, parent) {
    if (node == null) return;
    if (node.data === value) {
      if (node.left === null || node.right === null) {
        const newNode = node.left !== null ? node.left : node.right;

        if (parent !== null) {
          if (parent.left === node) parent.left = newNode;
          else parent.right = newNode;
        } else {
          this.root = newNode;
        }
      } else {
        let nextBiggest = node.right;
        let nextBiggestParent = node;

        while (nextBiggest.left != null) {
          nextBiggestParent = nextBiggest;
          nextBiggest = nextBiggest.left;
        }

        this.delete(nextBiggest, nextBiggest.data, nextBiggestParent);
        node.data = nextBiggest.data;
      }
    } else if (value < node.data) {
      this.delete(node.left, value, node);
    } else {
      this.delete(node.right, value, node);
    }
  }

  find(value) {
    return this.findIn(this.root, value);
  }

  findIn(node, value) {
    if (node === null) return null;
    if (value < node.data) return this.findIn(node.left, value);
    if (value > node.data) return this.findIn(node.right, value);
    return node;
  }

  levelOrder(callback) {
    if (callback instanceof Function) {
      const queue = [];
      if (!this.empty()) queue.push(this.root);
      let node;
      while (queue.length > 0) {
        node = queue[0];
        callback(node);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
        queue.shift();
      }
    } else {
      throw new Error("Callback is needed to execute a level order traversal.");
    }
  }

  levelOrderRecursive(callback) {
    if (callback instanceof Function) {
      const list = !this.empty() ? [this.root] : [];
      this.#levelOrderRecursiveList(callback, list);
    } else {
      throw new Error("Callback is needed to execute a level order traversal.");
    }
  }

  #levelOrderRecursiveList(callback, list) {
    if (list.length === 0) return;
    const children = [];
    for (let node of list) {
      callback(node);
      if (node.left) children.push(node.left);
      if (node.right) children.push(node.right);
    }
    this.#levelOrderRecursiveList(callback, children);
  }

  inOrder(callback) {
    if (callback instanceof Function) {
      this.inOrderIn(this.root, callback);
    } else {
      throw new Error("Callback is needed to execute a level order traversal.");
    }
  }

  inOrderIn(node, callback) {
    if (node === null) return;
    this.inOrderIn(node.left, callback);
    callback(node);
    this.inOrderIn(node.right, callback);
  }

  preOrder(callback) {
    if (callback instanceof Function) {
      this.preOrderIn(this.root, callback);
    } else {
      throw new Error("Callback is needed to execute a level order traversal.");
    }
  }

  preOrderIn(node, callback) {
    if (node === null) return;
    callback(node);
    this.preOrderIn(node.left, callback);
    this.preOrderIn(node.right, callback);
  }

  postOrder(callback) {
    if (callback instanceof Function) {
      this.postOrderIn(this.root, callback);
    } else {
      throw new Error("Callback is needed to execute a level order traversal.");
    }
  }

  postOrderIn(node, callback) {
    if (node === null) return;
    this.postOrderIn(node.left, callback);
    this.postOrderIn(node.right, callback);
    callback(node);
  }

  height(value, node = this.root) {
    if (node === null) return null;

    let height = null;

    if (value === node.data) return 0;
    else if (value < node.data) height = this.height(value, node.left);
    else if (value > node.data) height = this.height(value, node.right);

    if (height !== null) return height + 1;

    return null;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const diff = Math.abs(
      this.treeHeight(node.left) - this.treeHeight(node.right)
    );

    if (diff <= 1)
      return this.isBalanced(node.left) && this.isBalanced(node.right);
    console.log(node.data);
    return false;
  }

  rebalance() {
    const nodes = [];
    const queue = [];
    if (!this.empty()) {
      queue.push(this.root);
      nodes.push(this.root.data);
    }
    let node;
    while (queue.length > 0) {
      node = queue[0];
      nodes.push(node.data);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      queue.shift();
    }
    this.root = this.buildTree(nodes);
  }

  empty() {
    return this.root === null;
  }

  treeHeight(node) {
    if (node === null) return -1;

    const leftHeight = this.treeHeight(node.left);
    const rightHeight = this.treeHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  fillRandom(min, max, quantity = 20) {
    const arr = [];
    for (let i = 0; i < quantity; i++) {
      arr.push(Math.floor(Math.random() * (max - min))) + min;
    }
    this.root = this.buildTree(arr);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
