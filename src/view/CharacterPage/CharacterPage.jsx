import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";

import CharacterCard from "../../components/CharacterCard/CharacterCard";
import {
  fetchCharacters,
  searchCharacters,
} from "../../library/service/characters_services";
import { KEYS, storage } from "../../library/storage";

import InfoMessage from "../../components/InfoMessage/InfoMessage";
import SearchInput from "../../components/SearchInput/SearchInput";
import Layout from "../../components/Layout";
import "./style.css";

const CharacterPage = () => {
  const [characterList, setCharacterList] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [selectedLimit, setSelectedLimit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [selecteddCharacterList, setSelectedCharacterList] = useState(
    storage.load(KEYS.SELECTED_CHARACTER_LIST) || []
  );
  const getCharacters = async (limit, offset) => {
    const data = await fetchCharacters(limit, offset);
    const { totalCharacters, characterList } = data;
    setCharacterList(characterList);
    setTotalCharacters(totalCharacters);
  };

  const handleSearch = (ev) => {
    ev.preventDefault();
    setShowSpinner(true);
    setTimeout(async () => {
      const searchValue = ev.target.value.trim();
      if (searchValue) {
        //error when call api with empty string
        const data = await searchCharacters(ev.target.value, 20, 0);
        setCharacterList(data);
      } else {
        getCharacters(20, 0);
      }
      setShowSpinner(false);
    }, 1000); //debounce
  };

  useEffect(() => {
    getCharacters(20, 0);
  }, []);

  useEffect(() => {
    // handle info message close
    if (selectedLimit) {
      setTimeout(() => {
        setSelectedLimit(false);
      }, 3000);
    }
  }, [selectedLimit]);

  if (!characterList) {
    return <p>Loading...</p>;
  }

  const characterListIsEmpty = !characterList.length;
  return (
    <Layout>
      {selectedLimit && (
        <InfoMessage title="You already selected maximum characters - 5" />
      )}
      <div className="character-grid-container">
        <SearchInput handleSearch={handleSearch} showSpinner={showSpinner} />
        {!characterListIsEmpty &&
          characterList.map((character) => (
            <CharacterCard
              setSelectedLimit={setSelectedLimit}
              key={character.id}
              character={character}
              setSelectedCharacterList={setSelectedCharacterList}
            />
          ))}

        {characterListIsEmpty &&
          selecteddCharacterList.map((character) => (
            <CharacterCard
              setSelectedLimit={setSelectedLimit}
              key={character.id}
              character={character}
              setSelectedCharacterList={setSelectedCharacterList}
            />
          ))}
      </div>
      {!characterListIsEmpty && (
        <Pagination
          locale={"use-en"}
          simple
          showQuickJumper
          pageSize={20}
          prevIcon={
            <i className="fa fa-step-backward fa-lg prev-pagination-button"></i>
          }
          nextIcon={
            <i className="fa fa-step-forward fa-lg next-pagination-button"></i>
          }
          total={totalCharacters}
          current={currentPage}
          onChange={(current, pageSize) => {
            setCurrentPage(current);
            const offset = current === 1 ? 0 : current * 20;
            getCharacters(20, offset);
          }}
        />
      )}
    </Layout>
  );
};

export default CharacterPage;
