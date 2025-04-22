import { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import { fetchMultiplePokemon } from "../apis/pokemonApi";
import { shuffleArray, IsGameOver } from "../utils/gameUtils";
import "../styles/GameBoard.css";

const GameBoard = ({ setScore, setHighScore, highScore }) => {
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Number of Pokemon cards in the game
  const POKEMON_COUNT = 12;

  // Load Pokemon data on component mount
  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        const pokemonData = await fetchMultiplePokemon(POKEMON_COUNT);
        setPokemon(shuffleArray(pokemonData));
        setLoading(false);
      } catch (error) {
        setError(`Failed to load Pokemon. Please try again. ${error.message}`);
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const loadNewPokemon = async () => {
    try {
      setLoading(true);
      const pokemonData = await fetchMultiplePokemon(POKEMON_COUNT);
      setPokemon(shuffleArray(pokemonData));
      setLoading(false);
    } catch (error) {
      setError(`Failed to load Pokemon. Please try again. ${error.message}`);
      setLoading(false);
    }
  };

  // Handle card click
  const handleCardClick = useCallback(
    (pokemonId) => {
      // If this Pokemon was already clicked, game over
      if (clickedPokemon.has(pokemonId)) {
        // Reset the game
        setClickedPokemon(new Set());
        setScore(0);
        // Shuffle the cards
        setPokemon(shuffleArray([...pokemon]));
        return;
      }

      // Update clicked Pokemon
      const newClickedPokemon = new Set(clickedPokemon);
      newClickedPokemon.add(pokemonId);
      setClickedPokemon(newClickedPokemon);

      // Update score
      const newScore = newClickedPokemon.size;
      setScore(newScore);

      // Update high score if needed
      if (newScore > highScore) {
        setHighScore(newScore);
      }

      // Check if game is over
      if (IsGameOver(newClickedPokemon, POKEMON_COUNT)) {
        // Show success message
        setShowSuccessMessage(true);

        // Hide message and reset game after delay
        setTimeout(() => {
          setShowSuccessMessage(false);
          setClickedPokemon(new Set());
          setScore(0);
          // Load new Pokemon for a fresh game
          loadNewPokemon();
        }, 5000);
        return;
      }

      // Shuffle the cards
      setPokemon(shuffleArray([...pokemon]));
    },
    [clickedPokemon, pokemon, setScore, setHighScore, highScore]
  );

  if (loading) {
    return <div className="loading">Loading Pokemon...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="game-board">
      {showSuccessMessage && (
        <h3 className="success-message">
          Congratulations! You have successfully finished the game!
        </h3>
      )}
      <div className="cards-container">
        {pokemon.map((monster) => (
          <Card
            key={monster.id}
            pokemon={monster}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;