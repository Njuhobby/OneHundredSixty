import { Game } from './game.model';
import { RoadMapItem } from './road-map-item.model';

describe('Game', () => {
  it('should create an instance', () => {
    expect(new Game(new Date("01/01/2010"), 0, "Hobby", "Yawei", "Ps", "Leon", 2, {"items": [new RoadMapItem("5", "Hobby", "Leon", 130)]},{"items": [new RoadMapItem("5", "Hobby", "Leon", 130)]})).toBeTruthy();
  });
});
