export default class Ship {
  constructor(type, size) {
    this.type = type;
    this.size = size;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }
}