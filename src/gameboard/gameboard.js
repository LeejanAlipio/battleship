export default class Gameboard {
  #size = 10;
  #board = this.#createBoard();

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

      this.#board[currentRow][currentColumn] = 'ship';
    }

    return { board: this.#board, status: true };
  }
}
