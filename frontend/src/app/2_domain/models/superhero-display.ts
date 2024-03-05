export interface ISuperhero {
  id: string;
  name: string;
  image: string;
  appearance: {
    eyeColor: string;
    gender: string;
    hairColor: string;
    height: string;
    race: string;
    weight: string;
  };
  biography: {
    fullName: string;
    placeOfBirth: string;
  };
  connections: {
    relatives: string[];
  };
  powerstats: {
    combat: number;
    durability: number;
    intelligence: number;
    power: number;
    speed: number;
    strength: number;
  };
  work: string;
}
