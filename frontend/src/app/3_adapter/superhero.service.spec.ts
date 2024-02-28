import { TestBed } from '@angular/core/testing';

import { SuperheroAdapter } from './superhero.service';

describe('SuperheroAdapter', () => {
  let service: SuperheroAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
