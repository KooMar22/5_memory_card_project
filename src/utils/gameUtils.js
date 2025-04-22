// Shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Check if the game is over (all cards have been clicked)
const IsGameOver = (clickedCards, totalCards) => {
    return clickedCards.size === totalCards;
}

// Get high score from local storage
const getHighScore =  () => {
    const savedHighScore = localStorage.getItem("pokemonMemoryHighScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
}

// Save high score to local storage
const saveHighScore = (score) =>{
    localStorage.setItem("pokemonMemoryHighScore", score.toString());
}

export { shuffleArray, IsGameOver, getHighScore, saveHighScore };