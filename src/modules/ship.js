export default class Ship {
  constructor(size) {
    this.size = size;
    this.hits = 0;
  }

  hit() {
    this.hits++;
    this.isSunk();
  }

  isSunk() {
    if (this.hits === this.size) {
      return true;
    }

    return false;
  }
}