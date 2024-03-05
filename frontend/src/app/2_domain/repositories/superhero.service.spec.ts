import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuperheroRepository } from './superhero.service';

describe('SuperheroRepository', () => {
  let service: SuperheroRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroRepository],
    });
    service = TestBed.inject(SuperheroRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
