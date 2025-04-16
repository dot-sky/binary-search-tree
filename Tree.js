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
    console.log(arr[mid], start, end);
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

  delete(value) {
    this.deleteFrom(this.root, value, null);
  }

  deleteFrom(node, value, parent) {
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

        this.deleteFrom(nextBiggest, nextBiggest.data, nextBiggestParent);
        node.data = nextBiggest.data;
      }
    } else if (value < node.data) {
      this.deleteFrom(node.left, value, node);
    } else {
      this.deleteFrom(node.right, value, node);
    }
  }

  prettyPrint(node, prefix = "", isLeft = true) {
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
