/**
 * Grid component renders Box components mapping to set of characters.
 * Randomly assign characters to boxes s.t. each character maps to a box, and track where character images are dropped.
 * Passes applicable state and character to Boxes for handling image drops, random hint generation, and etc.
 */

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
