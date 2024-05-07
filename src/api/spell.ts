import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Spell, SpellResult } from "../model/spell";
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
    queryFn: (): Spell[] => {
      const favouriteSpell = localStorage.getItem(UNIQUE_KEYS.FAVOURITE);
      return JSON.parse(favouriteSpell ?? "");
    },
  });
};

// Add fourite ids to local storage
export const addToFavouriteToLocalStorage = async (
  favouriteSpells: Spell[]
) => {
  localStorage.setItem(UNIQUE_KEYS.FAVOURITE, JSON.stringify(favouriteSpells));
  return null;
};

export const useAddToFavouriteToLocalStorage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (spells: Spell[]) => addToFavouriteToLocalStorage(spells),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UNIQUE_KEYS.FAVOURITE] });
    },
  });
};

// fetch multiple spells by ids

export const useGetMultipleSpellsByIds = (ids: string[]) => {
  return useQueries({
    queries: ids.map((id) => {
      return {
        queryKey: [UNIQUE_KEYS.SPELL, id],
        queryFn: () => getSpellsByURL(id),
      };
    }),
  });
};
