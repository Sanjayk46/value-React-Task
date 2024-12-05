import React, { useState } from "react";

const BoxSplit = () => {
  const [boxes, setBoxes] = useState([
    { id: 1, level: 0, size: 400, x: 0, y: 0 },
  ]); // Initial single box

  const handleBoxClick = (box) => {
    const newBoxes = [];
    const newSize = box.size / 2;

    // Generate 4 smaller boxes
    for (let i = 0; i < 4; i++) {
      newBoxes.push({
        id: Date.now() + i, // Unique ID
        level: box.level + 1,
        size: newSize,
        x: box.x + (i % 2) * newSize,
        y: box.y + Math.floor(i / 2) * newSize,
      });
    }

    // Remove the clicked box and add the smaller boxes
    setBoxes((prev) => prev.filter((b) => b.id !== box.id).concat(newBoxes));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        margin: "20px auto",
        border: "1px solid black",
      }}
    >
      {boxes.map((box) => (
        <div
          key={box.id}
          onClick={() => handleBoxClick(box)}
          style={{
            position: "absolute",
            width: `${box.size}px`,
            height: `${box.size}px`,
            left: `${box.x}px`,
            top: `${box.y}px`,
            backgroundColor: "white",
            border: "1px solid black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {box.size >= 50 && "Click"} {/* Show "Click" only if the box is large enough */}
        </div>
      ))}
    </div>
  );
};

export default BoxSplit;
