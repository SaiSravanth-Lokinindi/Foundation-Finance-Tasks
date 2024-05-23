import React, { useState } from "react";

import SquareMeetingSimulation from "./components/SquareMeetingSimulation copy";

const App = () => {
  const [side, setSide] = useState(500);
  const [speed, setSpeed] = useState(4);

  const handleSideChange = (e) => {
    let updatedSide = Number(e.target.value);
    if (isNaN(updatedSide)) {
      return;
    }
    setSide(updatedSide);
  };

  const handleSpeedChange = (e) => {
    let updatedSpeed = Number(e.target.value);
    if (isNaN(updatedSpeed)) {
      return;
    }
    setSpeed(updatedSpeed);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
        gap: "2rem",
      }}
    >
      <h1>Sqaure Meet Animation</h1>
      <SquareMeetingSimulation
        side={side}
        speed={speed}
        sideChange={handleSideChange}
        speedChange={handleSpeedChange}
      />
    </div>
  );
};

export default App;
