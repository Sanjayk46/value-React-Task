import React, { useState, useEffect } from "react";

const Game = () => {
  const [keywordIndex, setKeywordIndex] = useState(null); // Current index of the box with the keyword
  const [score, setScore] = useState(0); // Player's score
  const [timeRemaining, setTimeRemaining] = useState(60); // Game timer
  const [gameRunning, setGameRunning] = useState(false); // Game state

  const gridSize = 9; // Total boxes (3x3 grid)

  useEffect(() => {
    let timer;

    if (gameRunning && timeRemaining > 0) {
      // Decrease the time remaining every second
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      // Randomly display the keyword every 1 second
      const displayInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * gridSize);
        setKeywordIndex(randomIndex);

        // Remove the keyword after 1 second
        setTimeout(() => setKeywordIndex(null), 1000);
      }, 1000);

      // Cleanup intervals on component unmount or game end
      return () => {
        clearInterval(timer);
        clearInterval(displayInterval);
      };
    }

    if (timeRemaining === 0) {
      setGameRunning(false);
    }
  }, [gameRunning, timeRemaining]);

  const handleBoxClick = (index) => {
    if (!gameRunning) return;

    if (index === keywordIndex) {
      setScore((prevScore) => prevScore + 5); // Award 5 points for correct click
    } else {
      setScore((prevScore) => prevScore - 2.5); // Deduct 2.5 points for incorrect click
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeRemaining(60);
    setGameRunning(true);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>HIT Game</h1>
      <div>
        <h3>Time Remaining: {timeRemaining}s</h3>
        <h3>Score: {score}</h3>
      </div>

      {/* Grid of boxes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gridGap: "10px",
          justifyContent: "center",
          margin: "20px auto",
        }}
      >
        {Array.from({ length: gridSize }).map((_, index) => (
          <div
            key={index}
            onClick={() => handleBoxClick(index)}
            style={{
              width: "100px",
              height: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid black",
              backgroundColor: keywordIndex === index ? "lightgreen" : "white",
              cursor: "pointer",
            }}
          >
            {keywordIndex === index ? "HIT" : ""}
          </div>
        ))}
      </div>

      {/* Start Button */}
      {!gameRunning && timeRemaining === 0 && (
        <h2>Final Score: {score}</h2>
      )}
      <button
        onClick={startGame}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {gameRunning ? "Restart Game" : "Start Game"}
      </button>
    </div>
  );
};

export default Game;
