export type Digimon = {
  id: number;
  name: string;
  images: {
    href: string;
    transparent: boolean;
  }[];
  levels: {
    id: number;
    level: string;
  }[];
  types: {
    id: number;
    type: string;
  }[];
};
