import React, { useEffect, useRef, useState } from "react";
import Pagination from "rc-pagination";
import { debounce, isEmpty } from "lodash";

import CharacterCard from "../../components/CharacterCard/CharacterCard";
import { fetchCharacters } from "../../library/service/charactersServices";
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
  const [searchLoader, setSearchLoader] = useState(false);

  const [selectedCharacterList, setSelectedCharacterList] = useState(
    storage.load(KEYS.SELECTED_CHARACTER_LIST) || []
  );
  const getCharacters = async (limit, offset, searchValue = false) => {
    const data = await fetchCharacters(limit, offset, searchValue);
    const { totalCharacters, characterList } = data;
    setCharacterList(characterList);
    setTotalCharacters(totalCharacters);
    setSearchLoader(false);
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

  const debounceSearch = useRef(
    debounce((searchValue) => {
      getCharacters(20, 0, searchValue);
    }, 1000)
  );

  useEffect(
    () => {
      if (searchQuery) {
        setSearchLoader(true);
        debounceSearch.current(searchQuery);
      } else {
        debounceSearch.current(false);
        setCurrentPage(1);
      }
    },
    [searchQuery] // Handle debounce search
  );

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
          handleSearch={(ev) => {
            setSearchQuery(ev.target.value);
          }}
          showSpinner={searchLoader}
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
            getCharacters(20, offset, searchQuery);
          }}
        />
      )}
    </Layout>
  );
};

export default CharacterPage;
