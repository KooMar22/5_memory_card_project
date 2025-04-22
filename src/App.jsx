import { useState, useEffect } from "react";
import GameBoard from "./components/GameBoard";
import ScoreBoard from "./components/ScoreBoard";
import { getHighScore, saveHighScore } from "./utils/gameUtils";
import "./styles/App.css";

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const saveHighScore = getHighScore();
    setHighScore(saveHighScore);
  }, []);

  // Save high score to localStorage when it changes
  useEffect(() => {
    if (highScore > 0) {
      saveHighScore(highScore);
    }
  }, [highScore]);

  return (
    <div className="container">
      <h1>Pokemon Memory Game</h1>
      <p className="instructions">
        Click on a Pokémon card, but don't click on the same card twice!
      </p>
      <ScoreBoard score={score} highScore={highScore} />
      <GameBoard
        setScore={setScore}
        setHighScore={setHighScore}
        highScore={highScore}
      />
    </div>
  );
}

export default App