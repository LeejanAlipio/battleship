import Ship from "../src/modules/ship.js";

describe("Create ships", () => {
  test('creates a 2 part ship', () => {
    expect(new Ship('Patrol Boat', 2)).toEqual({type: 'Patrol Boat', size: 2});
  })
})