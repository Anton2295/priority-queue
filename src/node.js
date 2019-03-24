class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;

		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left == null) {
			this.left = node;
			this.left.parent = this;
		}
		else
			if (this.right == null) {
				this.right = node;
				this.right.parent = this;
			}
	}

	removeChild(node) {

		if (node != this.left && node != this.right)
			throw new Error();

		if (node == this.left) {
			this.left = null;
			node.parent = null;
		}

		if (node == this.right) {
			this.right = null;
			node.parent = null;
		}

	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {


/**       c                                        c
         /                                        /
        b                                        a                
       /  \                                     /  \             
      a    other      - swapWithParent ->     b    other   
     / \                                     / \              
a_left  a_right                         a_left  a_right                   
**/

		if (this.parent != null) {
		

			let c = this.parent.parent;

			let a = this;

			let b = this.parent; let other;

			let a_left = this.left; let a_right = this.right;

				// c - b --> c - a

			if (c != null) {

				if (c.left == b) {
					c.left = a;
					c.left.parent = c;
				}
				else {
					if (c.right == b)
						c.right = a;
					c.right.parent = c;
				}

			}

			a.parent = c;

			//b - other  --> a - other
			//b - a  --> a - b

			if (b.left == a) {
				a.left = b;
				b.parent = a;

				a.right = b.right;
				if (a.right != null)
					a.right.parent = a;
			}
			else
				if (b.right == a) {
					a.right = b;
					b.parent = a;

					a.left = b.left;
					if (a.left != null)
						a.left.parent = a;
				}

			// a - a_left --> b - a_left
		

			b.left = a_left;

			if (a_left != null)
				a_left.parent = b;

			// a - a_right --> b - a_right

			b.right = a_right;

			if (a_right != null)
				a_right.parent = b;

		}


	}

}

module.exports = Node;
