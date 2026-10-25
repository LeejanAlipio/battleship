import Ship from '../src/modules/ship.js';

describe('creates ships', () => {
  test('creates a patrol boat ship with 2 size', () => {
    expect(new Ship(2)).toEqual({
      size: 2,
      hits: 0,
    });
  });

  test('creates a destroyer boat with 3 size', () => {
    expect(new Ship(3)).toEqual({
      size: 3,
      hits: 0,
    });
  });
});

describe('destroy part of the ship', () => {
  let ship = new Ship(3);

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('destroy a part when opponent clicks it', () => {
    ship.hit();

    expect(ship.hits).toEqual(1);
  });

  test('destoy all part', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.hits).toBe(3);
  });
});

describe('checks if a ship is destroyed', () => {
  const ship = new Ship(3);

  test('true if ships size and hits are equal', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  })
})