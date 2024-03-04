import { Injectable } from '@angular/core';
import { ISuperhero } from '../../2_domain/models/superhero-display';
import { BehaviorSubject, Observable, Subject, takeUntil, tap } from 'rxjs';

import { SuperheroRepository } from '../../2_domain/repositories/superhero.service';
import { IDBSuperhero } from '../../2_domain/models/superhero-db';

interface PartialSuperhero extends Partial<ISuperhero> {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class SuperheroService {
  private superherosSubject: BehaviorSubject<Partial<ISuperhero>[]> = new BehaviorSubject<Partial<ISuperhero>[]>([]);
  public superheros$: Observable<Partial<ISuperhero>[]> = this.superherosSubject.asObservable();

  private emptySuperhero = {
    id: '',
    name: '',
    image: '',
    appearance: {
      eyeColor: '',
      gender: '',
      hairColor: '',
      height: '',
      race: '',
      weight: '',
    },
    biography: {
      fullName: '',
      placeOfBirth: '',
    },
    connections: {
      relatives: [],
    },
    powerstats: {
      combat: 0,
      durability: 0,
      intelligence: 0,
      power: 0,
      speed: 0,
      strength: 0,
    },
    work: '',
  };

  private heroSubject = new BehaviorSubject<ISuperhero>(this.emptySuperhero);
  public hero$ = this.heroSubject.asObservable();

  private filters = {
    name: '',
  };
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private superheroRepository: SuperheroRepository) {}

  get() {
    this.superheroRepository
      .get(this.filters)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (superheros: Partial<ISuperhero>[]) =>
          this.superherosSubject.next(superheros),
        error: (error) => console.error('🔥 Error getting superheros:', error),
      });
  }

  setFilter(filters: { name: string }) {
    this.filters = filters;
    this.get();
  }

  private transformToLocalFormat(superhero: IDBSuperhero): ISuperhero {
    const relatives = superhero.connections.relatives.split(';');

    return {
      id: superhero.id,
      name: superhero.name,
      image: superhero.images.md,
      appearance: {
        eyeColor: superhero.appearance.eyeColor,
        gender: superhero.appearance.gender,
        hairColor: superhero.appearance.hairColor,
        height: superhero.appearance.height[1],
        race: superhero.appearance.race,
        weight: superhero.appearance.weight[1],
      },
      biography: {
        fullName: superhero.biography.fullName,
        placeOfBirth: superhero.biography.placeOfBirth,
      },
      connections: {
        relatives,
      },
      powerstats: {
        combat: superhero.powerstats.combat,
        durability: superhero.powerstats.durability,
        intelligence: superhero.powerstats.intelligence,
        power: superhero.powerstats.power,
        speed: superhero.powerstats.speed,
        strength: superhero.powerstats.strength,
      },
      work: superhero.work.occupation,
    };
  }

  getById(id: string | null): Observable<ISuperhero> {
    const storedSuperheroes = localStorage.getItem('allResponse');
    const superheroes: IDBSuperhero[] = storedSuperheroes
      ? JSON.parse(storedSuperheroes)
      : [];

    const localHero = superheroes.find((hero) => hero.id == id);

    if (localHero) {
      const transformedHero = this.transformToLocalFormat(localHero);
      this.heroSubject.next(transformedHero);

      return this.hero$;
    }

    return this.superheroRepository.getById(id).pipe(
      tap((superhero) => {
        this.heroSubject.next(superhero);
      })
    );
  }

  setSuperhero(superhero: ISuperhero) {
    this.heroSubject.next(superhero);
  }

  private transformToOriginalFormat(transformedHero: ISuperhero): IDBSuperhero {
    return {
      id: transformedHero.id,
      name: transformedHero.name,
      images: {
        md: transformedHero.image,
        xs: '',
        sm: '',
        lg: '',
      },
      appearance: {
        eyeColor: transformedHero.appearance.eyeColor,
        gender: transformedHero.appearance.gender,
        hairColor: transformedHero.appearance.hairColor,
        height: ['', transformedHero.appearance.height],
        race: transformedHero.appearance.race,
        weight: ['', transformedHero.appearance.weight],
      },
      biography: {
        fullName: transformedHero.biography.fullName,
        placeOfBirth: transformedHero.biography.placeOfBirth,
        aliases: [''],
        alignment: '',
        alterEgos: '',
        firstAppearance: '',
        publisher: '',
      },
      connections: {
        relatives: transformedHero.connections.relatives.join(';'),
        groupAffiliation: '',
      },
      powerstats: {
        combat: transformedHero.powerstats.combat,
        durability: transformedHero.powerstats.durability,
        intelligence: transformedHero.powerstats.intelligence,
        power: transformedHero.powerstats.power,
        speed: transformedHero.powerstats.speed,
        strength: transformedHero.powerstats.strength,
      },
      work: {
        occupation: transformedHero.work,
        base: '',
      },
      slug: '',
    };
  }

  update(
    id: string,
    updatedProperties: PartialSuperhero
  ): Observable<ISuperhero | null> {
    const currentHero = this.heroSubject.getValue();

    const allowedProperties = ['name', 'work', 'biography.placeOfBirth'];
    const filteredUpdate: PartialSuperhero = {};

    allowedProperties.forEach((prop) => {
      const nestedProps = prop.split('.');
      const lastProp = nestedProps.pop();
      let currentObj = filteredUpdate;

      nestedProps.forEach((nestedProp) => {
        currentObj = currentObj[nestedProp] = {};
      });

      if (updatedProperties.hasOwnProperty(prop)) {
        currentObj[lastProp!] = updatedProperties[prop];
      }
    });

    const newHero: ISuperhero = { ...currentHero, ...filteredUpdate };
    const transformedHero = this.transformToOriginalFormat(newHero);

    const storedSuperheroes = localStorage.getItem('allResponse');
    let superheroes: IDBSuperhero[] = storedSuperheroes
      ? JSON.parse(storedSuperheroes)
      : [];

    superheroes = superheroes.map((hero) => (hero.id == id ? transformedHero : hero));

    localStorage.setItem('allResponse', JSON.stringify(superheroes));

    this.setSuperhero(newHero);

    return this.hero$;
  }

  delete(id: string) {
    const storedSuperheroes = localStorage.getItem('allResponse');
    let superheroes: ISuperhero[] = storedSuperheroes ? JSON.parse(storedSuperheroes) : [];

    superheroes = superheroes.filter((hero) => hero.id != id);

    localStorage.setItem('allResponse', JSON.stringify(superheroes));

    const updatedHero = superheroes.length > 0 ? superheroes[0] : this.emptySuperhero;

    this.setSuperhero(updatedHero);
  }

  private generateUniqueId(superheroes: IDBSuperhero[]): string {
    const lastId = superheroes.reduce((maxId, hero) => {
      const heroId = parseInt(hero.id, 10);
      return heroId > maxId ? heroId : maxId;
    }, 0);
    const newId = lastId + 1;

    return newId.toString();
  }

  create(newHero: {
    name: string;
    img: string;
    placeOfBirth: string;
    work: string;
    stats: {
      combat: number;
      durability: number;
      intelligence: number;
      power: number;
      speed: number;
      strength: number;
    }
  }): Observable<ISuperhero> {
    const storedSuperheroes = localStorage.getItem('allResponse');
    let superheroes: IDBSuperhero[] = storedSuperheroes
      ? JSON.parse(storedSuperheroes)
      : [];

    const hero = {
      ...this.emptySuperhero,
      id: this.generateUniqueId(superheroes),
      name: newHero.name,
      biography: {
        fullName: '',
        placeOfBirth: newHero.placeOfBirth,
      },
      image: newHero.img,
      work: newHero.work,
      powerstats: newHero.stats
    };
    const transformedHero = this.transformToOriginalFormat(hero);

    superheroes.push(transformedHero);
    localStorage.setItem('allResponse', JSON.stringify(superheroes));
    this.setSuperhero(hero);

    return this.hero$;
  }
}
