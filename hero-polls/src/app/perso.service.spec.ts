import { TestBed } from '@angular/core/testing';

import { PersoService } from './perso.service';

describe('HeroService', () => {
  let service: PersoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
