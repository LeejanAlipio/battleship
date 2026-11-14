import Ship from '../src/ship/ship.js';

describe('destroy part of the ship', () => {
  let ship = new Ship(3);

  beforeEach(() => {
    ship = new Ship(3);
  });

  test('destroy a part when opponent clicks it', () => {
    ship.hit();

    expect(ship.hits).toBe(1);
  });

  test('destroy all part', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.hits).toBe(3);
  });
});

describe('checks if a ship is destroyed', () => {
  let ship = new Ship(3);

  beforeEach(() => {
    ship = new Ship(3);
  })

  test('true if ships size and hits are equal', () => {
    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });

  test('false if ships size and hits are not equal', () => {
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(false);
  })
});
