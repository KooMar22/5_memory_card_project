import "../styles/Card.css";

const Card = function ({ pokemon, handleCardClick }) {
    return (
        <div className="card" onClick={() => handleCardClick(pokemon.id)}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
        </div>
    )
}

export default Card;