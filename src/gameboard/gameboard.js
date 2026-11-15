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
    for (let index = 0; index < ship.size; index++) {
      const currentRow = isVertical ? row + index: row;
      const currentColumn = isVertical ? column : column + index;

      this.#board[currentRow][currentColumn] = 'ship';
    }

    return this.#board;
  }
}
