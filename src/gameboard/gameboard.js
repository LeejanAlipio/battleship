export default class Gameboard {
  #size = 10;
  #board = this.#createBoard();
  #receivedAttacks = new Set();
  #missedShots = [];

  #createBoard() {
    const board = [];

    for (let row = 0; row < this.#size; row++) {
      board[row] = [];
      for (let column = 0; column < this.#size; column++) {
        board[row][column] = null;
      }
    }

    return board;
  }

  getBoard() {
    return this.#board;
  }

  getMissedShots() {
    return this.#missedShots;
  }

  placeShip(ship, { row, column }, isVertical) {
    const lastRow = isVertical ? row + ship.size - 1 : row;
    const lastColumn = isVertical ? column : column + ship.size - 1;

    if (
      row < 0 ||
      column < 0 ||
      lastRow >= this.#size ||
      lastColumn >= this.#size
    ) {
      return false;
    }

    for (let index = 0; index < ship.size; index++) {
      const currentRow = isVertical ? row + index : row;
      const currentColumn = isVertical ? column : column + index;

      if (this.#board[currentRow][currentColumn] !== null) {
        return false;
      }

      this.#board[currentRow][currentColumn] = ship;
    }

    return { board: this.#board, status: true };
  }

  receivedAttack({ row, column }) {
    if (!this.#validateInput(row, column)) return false;

    const position = `${row},${column}`;
    if (this.#receivedAttacks.has(position)) {
      return false;
    }

    this.#receivedAttacks.add(position);

    const ship = this.#board[row][column];
    if (ship) {
      ship.hit();
    } else {
      this.#missedShots.push({ row, column });
    }

    return true;
  }

  #validateInput(row, column) {
    if (
      !Number.isInteger(row) ||
      !Number.isInteger(column) ||
      row < 0 ||
      column < 0 ||
      row >= this.#size ||
      column >= this.#size
    ) {
      return false;
    }

    return true;
  }
}
