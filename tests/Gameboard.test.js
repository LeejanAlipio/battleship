import Gameboard from '../src/gameboard/gameboard.js';
import Ship from '../src/ship/ship.js';

let gameboard = null;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe('initialize a 2D board', () => {
  test('returns a 2D board filled with null', () => {
    const expectedBoard = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];

    expect(gameboard.getBoard()).toEqual(expectedBoard);
  });
});

describe('ship placement method', () => {
  let ship;
  let isVertical;

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('places a ship horizontally', () => {
    isVertical = false;

    const expectedPlacement = [
      [ship, ship, ship, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];

    const result = gameboard.placeShip(ship, { row: 0, column: 0 }, isVertical);

    expect(result.board).toEqual(expectedPlacement);
    for (let column = 0; column < ship.size; column++) {
      expect(result.board[0][column]).toBe(ship);
    }
  });

  test('places a ship vertically', () => {
    isVertical = true;

    const expectedPlacement = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, ship, null, null, null, null, null, null, null],
      [null, null, ship, null, null, null, null, null, null, null],
      [null, null, ship, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];

    const result = gameboard.placeShip(ship, { row: 2, column: 2 }, isVertical);

    expect(result.board).toEqual(expectedPlacement);
    for (let row = 2; row < 2 + ship.size; row++) {
      expect(result.board[row][2]).toBe(ship);
    }
  });

  test('do nothing if placement exceeded boundary', () => {
    isVertical = true;

    const result = gameboard.placeShip(ship, { row: 8, column: 1 }, isVertical);

    expect(result).toBe(false);
  });

  test('does not place a ship over an existing ship', () => {
    const anotherShip = new Ship(2);
    gameboard.placeShip(ship, { row: 0, column: 0 }, false);

    expect(
      gameboard.placeShip(anotherShip, { row: 0, column: 2 }, false)
    ).toBe(false);
    expect(gameboard.getBoard()[0][2]).toBe(ship);
  });
});

describe('attack method', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
    gameboard.placeShip(ship, { row: 2, column: 2 }, false);
  });

  test('attacks a part of the ship', () => {
    expect(gameboard.receivedAttack({ row: 2, column: 2 })).toBe(true);
    expect(ship.hits).toBe(1);
  });

  test('records a missed shot', () => {
    expect(gameboard.receivedAttack({ row: 0, column: 0 })).toBe(true);
    expect(gameboard.getMissedShots()).toEqual([{ row: 0, column: 0 }]);
  });

  test('does not count the same coordinate as a second attack', () => {
    gameboard.receivedAttack({ row: 2, column: 2 });

    expect(gameboard.receivedAttack({ row: 2, column: 2 })).toBe(false);
    expect(ship.hits).toBe(1);
  });

  test('rejects an attack outside the board', () => {
    expect(gameboard.receivedAttack({ row: 10, column: 0 })).toBe(false);
  });
});
