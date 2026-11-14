export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }
  
  hit() {
    if (this.hits === this.size) return;

    this.hits++;
  }

  isSunk() {
    if (this.hits === this.size) {
      return true;
    }

    return false;
  }
}