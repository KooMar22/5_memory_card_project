// Function to fetch specific Pokemon from ID

const fetchPokemon = async (id) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default || data.sprites.front_default
        };
    } catch (error) {
        console.error(`Error fetching Pokemon: ${error.message}`);
        return null;
    }
}

// Function to fetch multiple Pokemon (randomly from first 151)
const fetchMultiplePokemon = async (count) => {
    try {
        const pokemonList = [];
        const useIds = new Set();

        // Use original 151 Pokemon
        while (pokemonList.length < count) {
            const randomId = Math.floor(Math.random() * 151) + 1;

            if (!useIds.has(randomId)) {
                useIds.add(randomId);
                const pokemon = await fetchPokemon(randomId);
                if (pokemon) {
                    pokemonList.push(pokemon);
                }
            }
        }
        return pokemonList;
    } catch (error) {
        console.error(`Error fetching multiple Pokemon: ${error.message}`);
        return [];
    }
}

export { fetchPokemon, fetchMultiplePokemon };