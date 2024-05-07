import { useQuery } from "@tanstack/react-query";
import { SpellResult } from "../model/spell";
import { instance } from "../network";
import { SPELL_URL } from "../url/backend";

const UNIQUE_KEYS = {
  FAVOURITE: "favourite",
  SPELL: "spell",
} as const;

// fetch all queries

const getAllSpells = async (): Promise<SpellResult> => {
  const response = await instance.get(SPELL_URL);
  return response.data;
};

export const useGetAllSpells = () => {
  return useQuery({ queryKey: [UNIQUE_KEYS.SPELL], queryFn: getAllSpells });
};

// fetch spell detail by id(index)

const getSpellsByURL = async (index: string) => {
  const SPELL_URL_BY_ID = `${SPELL_URL}/${index}`;

  const response = await instance.get(SPELL_URL_BY_ID);
  return response.data;
};

export const useGetSpellsByURL = (index: string) => {
  return useQuery({
    queryKey: [UNIQUE_KEYS.SPELL, index],
    queryFn: () => getSpellsByURL(index),
    enabled: !!index,
  });
};

export const useGetFavouriteSpells = () => {
  return useQuery({
    queryKey: [UNIQUE_KEYS.FAVOURITE],
    queryFn: () => {
      const favouriteSpell = localStorage.getItem(UNIQUE_KEYS.FAVOURITE);
      return JSON.parse(favouriteSpell ?? "");
    },
  });
};

// Add fourite ids to local storage
export const addToFavouriteToLocalStorage = (favouriteIds: string[]) => {
  localStorage.setItem(UNIQUE_KEYS.FAVOURITE, JSON.stringify(favouriteIds));
};