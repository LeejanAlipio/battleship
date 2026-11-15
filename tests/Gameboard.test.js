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
      ['ship', 'ship', 'ship', null, null, null, null, null, null, null],
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

    expect(
      gameboard.placeShip(ship, { row: 0, column: 0 }, isVertical)
    ).toEqual(expectedPlacement);
  });

  test('places a ship vertically', () => {
    isVertical = true;

    const expectedPlacement = [
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, 'ship', null, null, null, null, null, null, null],
      [null, null, 'ship', null, null, null, null, null, null, null],
      [null, null, 'ship', null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ];

    expect(gameboard.placeShip(ship, { row: 2, column: 2 }, isVertical)).toEqual(expectedPlacement);
  });
});
