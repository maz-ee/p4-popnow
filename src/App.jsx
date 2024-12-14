/**
 * Main overarching App Component integrating drag-and-drop functions using react-dnd with HTML5Backend.
 * Combines Sidebar (containing draggable characters) and Grid (where there are drop target) components and tracks drag and drops with states.
 * Provides core structure and integrates components.
 */

import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Grid from "./components/Grid";
import Sidebar from "./components/Sidebar";
import "./index.css";

const App = () => {
  const [droppedImgs, setDroppedImgs] = useState({}); // Track dropped imgs
  const handleDropImage = (character, boxId) => {
    setDroppedImgs((prev) => ({
      ...prev,
      [boxId]: character,
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Sidebar />
        <Grid onDropImage={handleDropImage} droppedImgs={droppedImgs} />{" "}
      </div>
    </DndProvider>
  );
};

export default App;
