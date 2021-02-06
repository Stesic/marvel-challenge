import { API } from "../api/api";
import Character from "../models/Character";

const handleApiRequest = async (path) => {
  const response = await API.get(path);
  const characterList = response.data.results.map(character => (new Character(character)));
  const totalCharacters = Math.floor(response.data.total / 20) * 20; // to ensure pagination work properly

  return {
    characterList,
    totalCharacters,
  }
}

const fetchCharacters = async (limit = 20, offset = 0) => {
  try {
    const path = `/characters?limit=${limit}&offset=${offset}`
    return handleApiRequest(path)
  } catch (error) {
    console.log(error);
  }
};

const searchCharacters = async (searchQuery = "", limit = 20, offset = 0) => {
  try {

    const path = `/characters?nameStartsWith=${searchQuery}&limit=${limit}&offset=${offset}`
    return handleApiRequest(path)

  } catch (error) {
    console.log(error);
  }
};



export { fetchCharacters, searchCharacters };