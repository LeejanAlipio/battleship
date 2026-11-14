import Gameboard from '../src/gameboard/gameboard.js';
import Ship from '../src/ship/ship.js';

let gameboard = null;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe('initialize a 2D board', () => {
  test('returns a 2D board filled with null', () => {
    const gameboard = new Gameboard();

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