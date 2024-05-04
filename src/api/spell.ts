import { useQuery } from "react-query";
import { instance } from "../network";
import { GET_SPELL_URL } from "../url/backend";

// fetch all queries

const getAllSpells = async () => {
  const response = await instance.get(GET_SPELL_URL);
  return response;
};

export const useGetAllSpells = () => {
  return useQuery("spell", getAllSpells);
};
