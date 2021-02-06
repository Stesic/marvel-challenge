import React from "react";

import { storage, KEYS } from "../../library/storage";

import "./style.css";

const SelectedItem = () => <span className="fa fa-star fa-3x checked"></span>;

const UnselectedItem = () => <span className="fa fa-star fa-3x"></span>;

const CharacterCard = ({
  character,
  setSelectedCharacterList,
  setSelectedLimit,
}) => {
  const { imageUrl, name, id } = character;

  const selectedCharacters = (
    storage.load(KEYS.SELECTED_CHARACTER_LIST) || []
  ).find((item) => item.id === id);

  const handleCharacterSelect = () => {
    let updatedData;
    const selectedCharacters = storage.load(KEYS.SELECTED_CHARACTER_LIST) || [];
    const isSelected = selectedCharacters.find((item) => item.id === id);

    if (isSelected) {
      //if already added, remove
      const removeFromBookmarked = selectedCharacters.filter(
        (item) => item.id !== id
      );
      updatedData = [...removeFromBookmarked];
    } else {
      //if not exist, add to bookmarked
      if (selectedCharacters.length < 5) {
        updatedData = [...selectedCharacters, character];
      } else {
        setSelectedLimit(true);
        updatedData = [...selectedCharacters];
      }
    }
    setSelectedCharacterList(updatedData);
    storage.save(KEYS.SELECTED_CHARACTER_LIST, updatedData);
  };

  return (
    <div className="character-card">
      <img src={imageUrl} alt={name} />
      <span
        className="character-card-select-star"
        onClick={handleCharacterSelect}
      >
        {selectedCharacters?.name ? <SelectedItem /> : <UnselectedItem />}
      </span>
      <p>{name}</p>
    </div>
  );
};

export default CharacterCard;
