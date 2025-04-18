import { Tree } from "./Tree.js";
function printData(elem) {
  console.log(elem.data);
}

const tree = new Tree();
tree.fillRandom(0, 100, 20);
tree.prettyPrint(tree.root);

console.log({ isBalanced: tree.isBalanced() });
console.log("Level Order");
tree.levelOrder(printData);

console.log("Inorder");
tree.inOrder(printData);

console.log("Preorder");
tree.preOrder(printData);

console.log("Postorder");
tree.postOrder(printData);

// Unbalancing tree

tree.insert(100);
tree.insert(118);
tree.insert(104);
tree.insert(124);
tree.insert(103);
tree.insert(103);
tree.insert(130);

tree.prettyPrint();
console.log({ isBalanced: tree.isBalanced() });

// Rebalancing tree

tree.rebalance();
tree.prettyPrint();
console.log({ isBalanced: tree.isBalanced() });

console.log("Level Order");
tree.levelOrder(printData);

console.log("Inorder");
tree.inOrder(printData);

console.log("Preorder");
tree.preOrder(printData);

console.log("Postorder");
tree.postOrder(printData);
