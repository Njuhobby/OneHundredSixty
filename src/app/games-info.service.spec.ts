import { TestBed } from '@angular/core/testing';

import { GamesInfoService } from './games-info.service';

describe('GamesInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesInfoService = TestBed.get(GamesInfoService);
    expect(service).toBeTruthy();
  });
});
