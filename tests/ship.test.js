import Ship from '../src/modules/ship.js';

describe('Create ships', () => {
  test('creates a patrol boat ship with 2 size', () => {
    expect(new Ship('Patrol Boat', 2)).toEqual({
      type: 'Patrol Boat',
      size: 2,
      hits: 0,
    });
  });

  test('creates a destroyer boat with 3 size', () => {
    expect(new Ship('Destroyer', 3)).toEqual({
      type: 'Destroyer',
      size: 3,
      hits: 0,
    });
  });
});

describe('Destroy part of the ship', () => {
  let ship = new Ship('Destoyer', 3);

  beforeEach(() => {
    ship = new Ship('Destoyer', 3);
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