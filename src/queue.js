const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		if (maxSize == undefined)
			this.maxSize = 30;
		else
			this.maxSize = maxSize;

		this.heap = new MaxHeap;

	}

	push(data, priority) {
		this.heap.push(data, priority);

		if (this.heap.size() > this.maxSize)
			throw new Error();
	}

	shift() {
		if (this.heap.size() > 0) {
			let node = this.heap.pop();
			return node;
		}
		else
			throw new Error();


	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (this.heap.size() == 0 || this.heap == null)
			return true
		else
			return false;
	}


}

module.exports = PriorityQueue;
