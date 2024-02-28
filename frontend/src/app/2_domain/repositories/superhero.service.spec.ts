import { TestBed } from '@angular/core/testing';

import { SuperheroRepository } from './superhero.service';

describe('SuperheroRepository', () => {
  let service: SuperheroRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
