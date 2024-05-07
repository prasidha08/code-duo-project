export type Spell = {
  index: string;
  name: string;
  level: number;
  url: string;
};

export type SpellResult = {
  count: number;
  results: Spell[];
};
