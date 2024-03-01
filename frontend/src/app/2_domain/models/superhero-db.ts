export interface IDBSuperhero {
  id: string;
  name: string;
  slug: string;
  powerstats: {
    combat: number;
    durability: number;
    intelligence: number;
    power: number;
    speed: number;
    strength: number;
  };
  appearance: {
    eyeColor: string;
    gender: string;
    hairColor: string;
    height: [string, string];
    race: string;
    weight: [string, string];
  };
  biography: {
    aliases: [string]
    alignment: string;
    alterEgos: string;
    firstAppearance: string;
    fullName: string;
    placeOfBirth: string;
    publisher: string;
  };
  work: {
    base: string;
    occupation: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}
