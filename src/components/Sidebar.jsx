import React, { useState } from "react";
import { useDrag } from "react-dnd";
import "./Sidebar.css";
import businessMan from "../assets/characters/business_man.png";
import conceitedMan from "../assets/characters/conceited_man.png";
import fox from "../assets/characters/fox.png";
import geographer from "../assets/characters/geographer.png";
import king from "../assets/characters/king.png";
import lamplighter from "../assets/characters/lamplighter.png";
import littlePrince from "../assets/characters/little_prince.png";
import merchant from "../assets/characters/merchant.png";
import rose from "../assets/characters/rose.png";
import snake from "../assets/characters/snake.png";
import switchMan from "../assets/characters/switch_man.png";
import tippler from "../assets/characters/tippler.png";

const Sidebar = () => {
  const [sbWidth, setSBWidth] = useState(100); // Init sidebar width 100 px
  const [sbResizing, setSBResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [characters, setCharacters] = useState([
    businessMan,
    conceitedMan,
    fox,
    geographer,
    king,
    lamplighter,
    littlePrince,
    merchant,
    rose,
    snake,
    switchMan,
    tippler,
  ]); // Store characters in sidebar

  const handleResize = (event) => {
    if (sbResizing) {
      const newWidth = sbWidth + (event.clientX - startX);
      const minWidth = 100; // Width can't go under this size
      if (newWidth > minWidth) {
        setSBWidth(newWidth);
        setStartX(event.clientX); // Update the starting X pos (for resizing)
      }
    }
  };

  const beginResize = (event) => {
    setSBResizing(true);
    setStartX(event.clientX); // Store init position of mouse on resizing
    event.preventDefault();
  };

  const finishResize = () => {
    setSBResizing(false);
  };

  const imgSize = sbWidth * 0.75; // Character img size is 75% of sidebar width

  const handleImgDrop = (image) => {
    setCharacters((prev) => prev.filter((character) => character !== image)); // Dropped img gets rem from sidebar
  };

  return (
    <div
      className="sidebar"
      style={{ width: `${sbWidth}px` }}
      onMouseMove={handleResize}
      onMouseUp={finishResize}
      onMouseLeave={finishResize}
    >
      <div className="resizer" onMouseDown={beginResize}></div>
      <div className="images-container">
        {characters.map((character, index) => (
          <DraggableImg
            key={index}
            character={character}
            imgSize={imgSize}
            onDrop={handleImgDrop}
          />
        ))}
      </div>
    </div>
  );
};

const DraggableImg = ({ character, imgSize, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "image",
    item: { character },
    collect: (state) => ({
      isDragging: state.isDragging(),
    }),
    end: (item, state) => {
      if (state.didDrop()) {
        onDrop(item.character); // If character dropped, remove from sidebar
      }
    },
  });

  return (
    <div
      ref={drag}
      className="character"
      style={{ opacity: isDragging ? 0.5 : 1 }} // Show that the particular character in sidebar is being dragged
    >
      <img
        src={character}
        alt="Character"
        style={{
          width: `${imgSize}px`,
          height: `${imgSize}px`,
        }}
      />
    </div>
  );
};

export default Sidebar;
