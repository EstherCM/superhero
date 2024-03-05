import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SuperheroAdapter } from './superhero.service';

describe('SuperheroAdapter', () => {
  let service: SuperheroAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroAdapter],
    });
    service = TestBed.inject(SuperheroAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
