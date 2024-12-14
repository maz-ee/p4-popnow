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
