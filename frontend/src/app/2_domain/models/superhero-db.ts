export interface IDBSuperhero {
  id: string;
  name: string;
  slug: string;
  powerstats: object;
  appearance: object;
  biography: object;
  work: object;
  connections: object;
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}
