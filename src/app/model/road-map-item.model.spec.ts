import { RoadMapItem } from './road-map-item.model';

describe('RoadMapItem', () => {
  it('should create an instance', () => {
    expect(new RoadMapItem("5", "Hobby", "Leon", 120)).toBeTruthy();
  });
});
