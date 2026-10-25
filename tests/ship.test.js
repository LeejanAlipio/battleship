import Ship from '../src/modules/ship.js';

describe('Create ships', () => {
  test('creates a patrol boat ship with 2 size', () => {
    expect(new Ship('Patrol Boat', 2)).toEqual({
      type: 'Patrol Boat',
      size: 2,
    });
  });
  test('creates a destroyer boat with 3 size', () => {
    expect(new Ship('Destroyer', 3)).toEqual({ type: 'Destroyer', size: 3 });
  });
});
