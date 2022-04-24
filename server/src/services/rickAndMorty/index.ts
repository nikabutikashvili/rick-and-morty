import axios from "axios";

export const getCharactersService = async () => {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  const { data } = response;

  return data.results;
};

export const getCharacterService = async (id: string) => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${id}`
  );
  const { data } = response;

  return data;
};
