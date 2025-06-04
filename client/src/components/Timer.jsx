import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";

const Timer = () => {
  const [mode, setMode] = useState("pomodoro"); // 'pomodoro', 'shortBreak', 'longBreak'
  const [durations, setDurations] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [timeLeft, setTimeLeft] = useState(durations.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setSessions((s) => (mode === "pomodoro" ? s + 1 : s));
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  useEffect(() => {
    setTimeLeft(durations[mode] * 60);
  }, [mode, durations]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const percentage = 1 - timeLeft / (durations[mode] * 60);
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-200 text-amber-600">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>

      {/* Modes */}
      <div className="flex space-x-4 mb-6">
        {["pomodoro", "shortBreak", "longBreak"].map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setIsRunning(false);
            }}
            className={classNames(
              "px-4 py-2 rounded-md text-white font-semibold transition",
              {
                "bg-amber-500": m === "pomodoro",
                "bg-amber-700": m === "shortBreak",
                "bg-amber-900": m === "longBreak",
                "opacity-70": m !== mode,
              }
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Circular Timer */}
      <div className="relative w-52 h-52 mb-6">
        <svg className="w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#10b981"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
            style={{
              transition: "stroke-dashoffset 1s linear",
              transform: "rotate(-90deg)",
              transformOrigin: "center",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className="px-4 py-2 bg-amber-500 text-white rounded-md"
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(durations[mode] * 60);
          }}
          className="px-4 py-2 bg-amber-300 text-white rounded-md"
        >
          Reset
        </button>
      </div>

      {/* Session Counter */}
      <p className="text-sm text-gray-600">Completed Pomodoros: {sessions}</p>

      {/* Custom Durations */}
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Custom Durations (minutes)</h2>
        <div className="flex flex-col gap-2">
          {["pomodoro", "shortBreak", "longBreak"].map((key) => (
            <div key={key} className="flex items-center gap-2">
              <label className="capitalize w-24">{key}</label>
              <input
                type="number"
                min="1"
                value={durations[key]}
                onChange={(e) =>
                  setDurations((prev) => ({
                    ...prev,
                    [key]: +e.target.value,
                  }))
                }
                className="border px-2 py-1 rounded w-20"
              />
              <span>min</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timer;
