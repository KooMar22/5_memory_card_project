import "../styles/ScoreBoard.css";

const ScoreBoard = function ({ score, highScore }) {
    return (
        <div className="score-board">
            <p>Current Score: <span className="score">{ score }</span></p>
            <p>High Score: <span className="high-score">{ highScore }</span> </p>
        </div>
    )
}

export default ScoreBoard;