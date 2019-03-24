const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = new Array();
		this.count = 0;
	}

	push(data, priority) {
		let newNode = new Node(data, priority);
		this.insertNode(newNode);
		this.shiftNodeUp(newNode);

		this.count++;

	}

	pop() {
		if (this.root != null) {

			let tempRoot = this.root;

			let detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);

			this.count--;

			//	console.log(tempRoot.data + " " + tempRoot.priority + " " + this.size() + " to POP");

			return tempRoot.data;
		}
	}

	detachRoot() {
		if (!this.root.right) {
			this.parentNodes.shift();
		}
		let root = this.root;
		this.root = null;
		return root;

	}


	restoreRootFromLastInsertedNode(detached) {

		let lastNode;

		if (this.parentNodes.length > 0)
			lastNode = this.parentNodes.pop();
		else
			lastNode = detached;


		if (lastNode.parent) {
			if (lastNode.parent.right == lastNode)
				this.parentNodes.unshift(lastNode.parent);
		}

		lastNode.remove();


		if (detached.left == lastNode)
			lastNode.left = null;
		else {
			lastNode.left = detached.left;
			if (lastNode.left != null)
				lastNode.left.parent = lastNode;
		}

		if (detached.right == lastNode)
			lastNode.right = null;
		else {
			lastNode.right = detached.right;
			if (lastNode.right != null)
				lastNode.right.parent = lastNode;
		}



		this.root = lastNode;

		let index = this.parentNodes.indexOf(detached);

		if (index != -1)
			this.parentNodes[index] = lastNode;

	}




	size() {
		return this.count;
	}

	isEmpty() {
		if (this.root)
			return false;
		else
			return true;
	}

	clear() {
		this.root = null;
		this.parentNodes = new Array();
		this.count = 0;
	}

	insertNode(node) {


		if (this.root == null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes.push(node);

			this.parentNodes[0].appendChild(node);

			if (this.parentNodes[0].right != null)
				this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (node.parent != null) {


			if (node.priority > node.parent.priority) {

				let index1 = this.parentNodes.indexOf(node);

				let index2 = this.parentNodes.indexOf(node.parent);


				if (index1 != -1)
					this.parentNodes[index1] = node.parent;

				if (index2 != -1)
					this.parentNodes[index2] = node;


				node.swapWithParent();

				this.shiftNodeUp(node);

				if (node.priority > this.root.priority)
					this.root = node;

			}

		}
	}

	shiftNodeDown(node) {
		if (node.left && node.priority < node.left.priority && (node.right == null || node.left.priority > node.right.priority)) {

			let index1 = this.parentNodes.indexOf(node);
			let index2 = this.parentNodes.indexOf(node.left);

			this.parentNodes[index1] = node.left;
			this.parentNodes[index2] = node;


			if (this.root == node)
				this.root = node.left;

			node.left.swapWithParent();
			this.shiftNodeDown(node);
		}
		else
			if (node.right && node.priority < node.right.priority) {

				let index1 = this.parentNodes.indexOf(node);
				let index2 = this.parentNodes.indexOf(node.right);

				this.parentNodes[index1] = node.right;
				this.parentNodes[index2] = node;


				if (this.root == node)
					this.root = node.right;

				node.right.swapWithParent();
				this.shiftNodeDown(node);
			}
	}
}

module.exports = MaxHeap;
