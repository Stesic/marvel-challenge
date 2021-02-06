import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import { debounce, isEmpty } from "lodash";

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
  const [characterList, setCharacterList] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [selectedLimit, setSelectedLimit] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const [selectedCharacterList, setSelectedCharacterList] = useState(
    storage.load(KEYS.SELECTED_CHARACTER_LIST) || []
  );
  const getCharacters = async (limit, offset) => {
    const data = await fetchCharacters(limit, offset);
    const { totalCharacters, characterList } = data;
    setCharacterList(characterList);
    setTotalCharacters(totalCharacters);
  };

  const delayedHandleSearch = debounce(async (searchValue) => {
    if (searchValue) {
      setSearchQuery(searchValue);
      //error when call api with empty string
      const data = await searchCharacters(searchValue, 20, 0);
      setTotalCharacters(data.totalCharacters);
      setShowSpinner(false);
      setCharacterList(data.characterList);
    } else {
      setShowSpinner(false);
      setCurrentPage(1);
      getCharacters(20, 0);
    }
  }, 1000);

  const handleSearch = (ev) => {
    ev.preventDefault();
    setShowSpinner(true);
    const searchValue = ev.target.value.trim();
    delayedHandleSearch(searchValue);
  };

  useEffect(() => {
    //get initial characters
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
    return <p style={{ color: "#fff" }}>Loading...</p>;
  }

  const characterListIsEmpty = isEmpty(characterList);
  return (
    <Layout>
      {selectedLimit && (
        <InfoMessage title="You already selected maximum characters - 5" />
      )}

      <div className="character-grid-container">
        <SearchInput
          placeholder="Search characters..."
          handleSearch={handleSearch}
          showSpinner={showSpinner}
        />
        {characterListIsEmpty
          ? selectedCharacterList.map((character) => (
              <CharacterCard
                setSelectedLimit={setSelectedLimit}
                key={character.id}
                character={character}
                setSelectedCharacterList={setSelectedCharacterList}
              />
            ))
          : characterList.map((character) => (
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
          onChange={async (current) => {
            setCurrentPage(current);
            const offset = current === 1 ? 0 : current * 20;
            if (searchQuery) {
              const data = await searchCharacters(searchQuery, 20, offset);
              setTotalCharacters(data.totalCharacters);
              setCharacterList(data.characterList);
            } else {
              getCharacters(20, offset);
            }
          }}
        />
      )}
    </Layout>
  );
};

export default CharacterPage;
