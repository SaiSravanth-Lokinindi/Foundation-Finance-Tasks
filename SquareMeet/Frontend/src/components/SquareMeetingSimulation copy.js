import React, { useState, useEffect } from "react";

import classes from "./SquareMeetingSimulation.modules.css";

const SquareMeetingSimulation = ({ side, speed, sideChange, speedChange }) => {
  // Initial positions of the four persons
  let initialPositions = [
    { x: 0, y: 0 },
    { x: side, y: 0 },
    { x: side, y: side },
    { x: 0, y: side },
  ];

  // State to store current positions of the four persons
  const [positions, setPositions] = useState(initialPositions);
  const [personsMet, setPersonsMet] = useState(false); // State for rendering content when they meet

  const handleSubmit = (e) => {
    e.preventDefault();
    setPositions(initialPositions);
    setPersonsMet(false);
  };

  const handleSideChange = (e) => {
    sideChange(e);
  };

  const handleSpeedChange = (e) => {
    speedChange(e);
  };

  // useEffect hook to fetch positions at regular intervals
  useEffect(() => {
    const intervalId = setInterval(
      () => {
        const flag = positions.some((item) => {
          return (
            Math.floor(item.x) === side / 2 && Math.floor(item.y) === side / 2
          );
        });

        if (!flag) {
          // While testing the backend server was run on port 4000

          fetch(
            `http://localhost:4000/getlocation?speed=${speed}&side=${side}&positions=${JSON.stringify(
              positions
            )}`,
            {
              method: "get",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setPositions((prev) => {
                // console.log(prev, data.locations);
                return data.locations;
              });
            });
        } else {
          clearInterval(intervalId);
          setPersonsMet(true);
        }
      },

      500 / speed
    );

    return () => {
      clearInterval(intervalId);
    };
  }, [side, speed, positions]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <label>
          Side Length
          <input
            type="number"
            value={side}
            onChange={(e) => {
              handleSideChange(e);
            }}
          />
        </label>
        <label>
          Speed
          <input
            type="number"
            value={speed}
            onChange={(e) => handleSpeedChange(e)}
          />
        </label>
        <button type="submit">Update</button>
      </form>
      <div
        style={{
          position: "relative",
          width: side,
          height: side,
          border: "2px solid black",
        }}
      >
        {positions.map((position, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: position.y,
              left: position.x,
              transform: "translate(-50%, -50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "red",
            }}
          ></div>
        ))}
      </div>
      {personsMet && (
        <span style={{ fontSize: "1.2rem" }}>
          They met after {Math.round(side / (Math.sqrt(2) * speed))} units
        </span>
      )}
    </>
  );
};

export default SquareMeetingSimulation;
