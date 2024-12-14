import React, { useState } from "react";
import Box from "./Box";

const Grid = () => {
  const characters = [
    "Business Man",
    "Conceited Man",
    "Fox",
    "Geographer",
    "King",
    "Lamplighter",
    "Little Prince",
    "Merchant",
    "Rose",
    "Snake",
    "Switch Man",
    "Tippler",
  ];

  const shuffledCharacters = characters.sort(() => Math.random() - 0.5); // randomly sort characters to give each box random character
  const [droppedImgs, setDroppedImgs] = useState([]);

  return (
    <div className="grid">
      {shuffledCharacters.map((character, index) => (
        <Box
          key={index}
          id={index}
          character={character}
          allCharacters={characters}
          droppedImgs={droppedImgs}
          setDroppedImgs={setDroppedImgs}
        />
      ))}
    </div>
  );
};

export default Grid;
