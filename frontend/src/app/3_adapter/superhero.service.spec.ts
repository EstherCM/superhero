import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SuperheroAdapter } from './superhero.service';
import { IDBSuperhero } from '../2_domain/models/superhero-db';

describe('[SuperheroAdapter] unit test', () => {
  let service: SuperheroAdapter;
  let httpMock: HttpTestingController;
  const baseURL = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';
  const superheros: IDBSuperhero[] = [
    {
      id: '1',
      name: 'Ironman',
      slug: 'mockedSlug',
      powerstats: {
        combat: 0,
        durability: 0,
        intelligence: 0,
        power: 0,
        speed: 0,
        strength: 0,
      },
      appearance: {
        eyeColor: 'mockedColor',
        gender: 'mockedGender',
        hairColor: 'mockedColor',
        height: ['200', '200'],
        race: 'mockedRace',
        weight: ['80', '80'],
      },
      biography: {
        aliases: ['mockedAliases'],
        alignment: 'mockedAlignment',
        alterEgos: 'mockedAlterEgo',
        firstAppearance: 'mockedAppearance',
        fullName: 'mockedFullName',
        placeOfBirth: 'mockedPlace',
        publisher: 'mockedPublisher',
      },
      work: {
        base: 'mockedBase',
        occupation: 'mockedOccupation',
      },
      connections: {
        groupAffiliation: 'mockedAffiliation',
        relatives: 'mockedRelatives',
      },
      images: {
        xs: 'mockedImage.png',
        sm: 'mockedImage.png',
        md: 'mockedImage.png',
        lg: 'mockedImage.png',
      },
    },
    {
      id: '2',
      name: 'Batman',
      slug: 'mockedSlug',
      powerstats: {
        combat: 0,
        durability: 0,
        intelligence: 0,
        power: 0,
        speed: 0,
        strength: 0,
      },
      appearance: {
        eyeColor: 'mockedColor',
        gender: 'mockedGender',
        hairColor: 'mockedColor',
        height: ['200', '200'],
        race: 'mockedRace',
        weight: ['80', '80'],
      },
      biography: {
        aliases: ['mockedAliases'],
        alignment: 'mockedAlignment',
        alterEgos: 'mockedAlterEgo',
        firstAppearance: 'mockedAppearance',
        fullName: 'mockedFullName',
        placeOfBirth: 'mockedPlace',
        publisher: 'mockedPublisher',
      },
      work: {
        base: 'mockedBase',
        occupation: 'mockedOccupation',
      },
      connections: {
        groupAffiliation: 'mockedAffiliation',
        relatives: 'mockedRelatives',
      },
      images: {
        xs: 'mockedImage.png',
        sm: 'mockedImage.png',
        md: 'mockedImage.png',
        lg: 'mockedImage.png',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperheroAdapter],
    });

    service = TestBed.inject(SuperheroAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('allResponse');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get', () => {
    it('should get all superheros from localStorage when it exists w/o filters', () => {
      const mockSuperheros: IDBSuperhero[] = superheros;

      localStorage.setItem('allResponse', JSON.stringify(mockSuperheros));
      service.get({ name: '' }).subscribe((superheros) => {
        expect(superheros).toEqual(mockSuperheros);
      });

      const req = httpMock.expectNone(`${baseURL}/all.json`);

      expect(req).toBeFalsy();
    });

    it('should get Batman from localStorage when it exists with name filter', () => {
      const mockSuperheros: IDBSuperhero[] = superheros;

      localStorage.setItem('allResponse', JSON.stringify(mockSuperheros));

      service.get({ name: 'Batman' }).subscribe((superheros) => {
        expect(superheros).toEqual(mockSuperheros[1]);
      });

      const req = httpMock.expectNone(`${baseURL}/all.json`);

      expect(req).toBeFalsy();
    });

    it('should get all superheros from HTTP w/o filters', () => {
      const mockSuperheros: IDBSuperhero[] = superheros;

      service.get({ name: '' }).subscribe((superheros) => {
        expect(superheros).toEqual(mockSuperheros);
      });

      const req = httpMock.expectOne(`${baseURL}/all.json`, 'GET');
      req.flush(mockSuperheros);
    });

    it('should save superheros to localStorage after HTTP request', () => {
      const mockSuperheros: IDBSuperhero[] = superheros;
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

      service.get({ name: '' }).subscribe((superheros) => {
        expect(superheros).toEqual(mockSuperheros);

        expect(setItemSpy).toHaveBeenCalledWith('allResponse', JSON.stringify(mockSuperheros));
      });

      const req = httpMock.expectOne(`${baseURL}/all.json`, 'GET');
      req.flush(mockSuperheros);
    });

    it('should get Ironman from HTTP with name filter', () => {
      const mockSuperheros: IDBSuperhero[] = superheros;
      const params = { name: 'Ironman' };

      service.get(params).subscribe((superheros) => {
        expect(superheros).toEqual(mockSuperheros[0]);
      });

      const req = httpMock.expectOne(`${baseURL}/all.json`, 'GET');
      req.flush(mockSuperheros);
    });
  });
});
