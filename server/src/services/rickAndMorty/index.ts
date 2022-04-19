import axios from "axios";

export const getCharactersService = async () => {
  const response = await axios.get("https://rickandmortyapi.com/api/character");
  const { data } = response;

  return data.results;
};
