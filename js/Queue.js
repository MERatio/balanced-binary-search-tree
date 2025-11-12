class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    const item = this.items[this.head++];
    // Trim internal array if it gets large.
    if (this.head > 50 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  isEmpty() {
    return this.head >= this.items.length;
  }
}

export default Queue;
