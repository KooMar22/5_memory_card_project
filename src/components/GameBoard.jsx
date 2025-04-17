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
        // Reset the game after showing a success message
        setTimeout(() => {
          alert("Congratulations! You've completed the game!");
          setClickedPokemon(new Set());
          setScore(0);
          // Load new Pokemon for a fresh game
          loadNewPokemon();
        }, 500);
        return;
      }

      // Shuffle the cards
      setPokemon(shuffleArray([...pokemon]));
    },
    [clickedPokemon, pokemon, setScore, setHighScore, highScore]
  );

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

  if (loading) {
    return <div className="loading">Loading Pokemon...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="game-board">
      <div className="cards-container">
        {pokemon.map((p) => (
          <Card key={p.id} pokemon={p} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;