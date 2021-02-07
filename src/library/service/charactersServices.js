import { API } from "../api/api";
import Character from "../models/Character";



const fetchCharacters = async (limit = 20, offset = 0, searchQuery = "") => {
  try {
    let path = `/characters?limit=${limit}&offset=${offset}`
    searchQuery && (path = path.concat(`&nameStartsWith=${searchQuery}`));

    const response = await API.get(path);
    const characterList = response.data.results.map(character => (new Character(character)));
    const totalCharacters = Math.floor(response.data.total / 20) * 20;

    return {
      characterList,
      totalCharacters,
    }
  } catch (error) {
    console.log(error);
  }
};





export { fetchCharacters };