import React, { useEffect, useState } from "react";

function getRandomColor(base, odd = false) {
  const diff = odd ? 30 : 0;
  return `rgb(${base[0] + diff}, ${base[1] + diff}, ${base[2] + diff})`;
}

export default function Game() {
  const [level, setLevel] = useState(1);
  const [gridSize, setGridSize] = useState(2);
  const [oddIndex, setOddIndex] = useState(0);
  const [baseColor, setBaseColor] = useState([100, 100, 250]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  // Initialize or restart a level
  const setupLevel = (newLevel = 1) => {
    const size = Math.min(2 + newLevel, 6);
    setGridSize(size);
    setOddIndex(Math.floor(Math.random() * size * size));
    setBaseColor([
      Math.floor(Math.random() * 150),
      Math.floor(Math.random() * 150),
      Math.floor(Math.random() * 150),
    ]);
    setTimeLeft(10);
  };

  useEffect(() => {
    if (isStarted) {
      setupLevel(level);
    }
  }, [level, isStarted]);

  useEffect(() => {
    if (!isStarted) return;

    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);

    if (timeLeft === 0) {
      setIsStarted(false);
      setIsEnded(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isStarted]);

  const handleClick = (index) => {
    if (index === oddIndex) {
      setLevel((prev) => prev + 1);
    } else {
      setIsStarted(false);
      setIsEnded(true);
    }
  };

  const startGame = () => {
    setLevel(1);
    setIsEnded(false);
    setIsStarted(true);
  };

  const total = gridSize * gridSize;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-4xl font-bold mb-3 text-blue-400">Odd One Out 🎯</h1>

      {/* Instructions */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-xl w-full mb-6">
        <h2 className="text-2xl font-semibold text-yellow-300 mb-2">Instructions 📝</h2>
        <ul className="list-disc pl-5 space-y-1 text-lg text-gray-200">
          <li>Click "Start Game" to begin.</li>
          <li>Spot and click the box that’s slightly different in color.</li>
          <li>You have 10 seconds for each level.</li>
          <li>Wrong choice or timeout ends the game.</li>
        </ul>
      </div>

      {/* Game control buttons */}
      {!isStarted && !isEnded && (
        <button
          onClick={startGame}
          className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-2 rounded shadow-lg transition-all"
        >
          ▶️ Start Game
        </button>
      )}

      {isEnded && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-xl text-red-400 font-semibold">
            ❌ Game Over! You reached Level {level}
          </p>
          <button
            onClick={startGame}
            className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-6 py-2 rounded shadow-lg transition-all"
          >
            🔁 Restart Game
          </button>
        </div>
      )}

      {/* Timer and Level Display */}
      {isStarted && (
        <>
          <div className="flex justify-between w-full max-w-sm text-xl mb-4">
            <span>🔥 Level: {level}</span>
            <span>⏳ Time: {timeLeft}s</span>
          </div>

          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${gridSize}, 60px)`,
            }}
          >
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                className="w-[60px] h-[60px] rounded-md shadow-lg cursor-pointer transition-transform transform hover:scale-110"
                onClick={() => handleClick(i)}
                style={{
                  backgroundColor: getRandomColor(baseColor, i === oddIndex),
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
