import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";

const Box = ({ id, character, allCharacters, droppedImgs, setDroppedImgs }) => {
  const [hints, setHints] = useState([]);
  const [clicked, setClicked] = useState(false); // Must track whether box is flicked to decide if hints revealed or not
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [notes, setNotes] = useState(new Array(9).fill("")); // Notes only have 9 ranks bc hints say which characters are NOT in box
  const [droppedImage, setDroppedImage] = useState(null); // Character img can be dropped into a box

  const getHints = () => {
    const excluded = allCharacters.filter((c) => c !== character); // characters besides the hidden character assigned to box
    const boxHints = [];
    while (boxHints.length < 3) {
      const randomChar = excluded[Math.floor(Math.random() * excluded.length)]; // randomly get character from edited character list
      if (!boxHints.includes(randomChar)) {
        // ensure no repeat hints
        boxHints.push(randomChar);
      }
    }
    setHints(boxHints);
  };

  const handleClick = () => {
    if (!clicked) {
      getHints(); // get hints for a box upon the first click on it
    }
    setClicked(true);
  };

  const handleKeyPress = (event) => {
    // when box is selected and you press shift-enter then notepad opens if not opened alr, or closes if currently open
    if (event.shiftKey && event.key === "Enter") {
      setIsNotepadOpen((prev) => !prev);
    }
  };

  const handleNotepadUpdate = (i, value) => {
    const updatedNotes = [...notes];
    updatedNotes[i] = value;
    setNotes(updatedNotes);
  };

  const closeNotepad = () => {
    setIsNotepadOpen(false);
  };

  const [, drop] = useDrop({
    // When an image is dropped into a box
    accept: "image",
    drop: (item) => {
      if (!droppedImgs.includes(item.character)) {
        setDroppedImage(item.character);
        setDroppedImgs([...droppedImgs, item.character]); // Add to list of dropped imgs
      }
    },
    canDrop: (item) => {
      return !droppedImgs.includes(item.character); // Cannot drop image into another box if its already been dropped
    },
  });

  const firstRank = notes[0]; // save first ranked guess in order to display it on box

  return (
    <div
      ref={drop}
      className="box"
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      {firstRank && <div className="maybe-text">{firstRank}? </div>}

      <div className={`hint ${clicked ? "" : "hidden"}`}>
        {hints.length > 0
          ? `not ~ ${hints.join(", ")}`
          : "Click to reveal hints"}
      </div>

      {droppedImage && (
        <div className="dropped-image">
          <img src={droppedImage} alt="Dropped" />
        </div>
      )}

      {isNotepadOpen && (
        <div className="notepad">
          <button className="close-btn" onClick={closeNotepad}>
            X
          </button>
          <h3>Rankings</h3>
          <ul>
            {Array.from({ length: 9 }, (_, i) => (
              <li key={i}>
                <input
                  type="text"
                  placeholder={`Rank ${i + 1}`}
                  value={notes[i]}
                  onChange={(event) =>
                    handleNotepadUpdate(i, event.target.value)
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Box;
