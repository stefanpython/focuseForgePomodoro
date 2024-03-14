import { useState, useEffect } from "react";

function Clock({ pomodoroDefault, shortBreakDefault, longBreakDefault }) {
  const [activeButton, setActiveButton] = useState<string>("Pomodoro");
  const [startBtn, setStartBtn] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [counter, setCounter] = useState<number>(0);
  const [round, setRound] = useState<number>(-1);

  // Increment round by 1 after going through a pomodoro + short/long break
  useEffect(() => {
    if (
      (activeButton === "Pomodoro" && timeLeft === 1499) ||
      (activeButton === "Short Break" && timeLeft === 299) ||
      (activeButton === "Long Break" && timeLeft === 899)
    ) {
      setCounter((prev) => prev + 1);
    }

    if (timeLeft === 0) {
      endSound.play();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (counter % 2 === 0) {
      setRound((prev) => prev + 1);
    }
  }, [counter]);

  // Create an audio element with the start sound file
  const startSound: HTMLAudioElement = new Audio("./hotel.mp3");

  // Create an audio element with the finish alarm file
  const endSound: HTMLAudioElement = new Audio("./alarms/bird.mp3");

  // Define the total session time based on the active button
  const totalSessionTime =
    activeButton === "Pomodoro"
      ? 25 * 60 // 25 minutes for Pomodoro
      : activeButton === "Short Break"
      ? 5 * 60 // 5 minutes for Short Break
      : 15 * 60; // 15 minutes for Long Break

  // Calculate the progress value based on the remaining time and the total session time
  const progressValue =
    ((totalSessionTime - timeLeft) / totalSessionTime) * 100;

  useEffect(() => {
    let intervalId: any;

    if (startBtn && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleButtonClick("Pomodoro");
      setStartBtn(false);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [startBtn, timeLeft]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "Pomodoro":
        setTimeLeft(25 * 60);
        break;
      case "Short Break":
        setTimeLeft(5 * 60);
        break;
      case "Long Break":
        setTimeLeft(15 * 60);
        break;
    }
  };

  const toggleStart = () => {
    startSound.play();
    setStartBtn((prevStartBtn) => !prevStartBtn);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleResetRound = () => {
    const confirmation: boolean = window.confirm(
      "Are you sure you want to reset session?"
    );
    if (confirmation) {
      setRound(1);
    } else {
      return;
    }
  };

  return (
    <div className="clock-container pl-2 pr-2 -mt-4">
      <progress
        className="progress progress-accent w-80 sm:w-96 -mb-3"
        value={progressValue}
        max="100"
      ></progress>

      <div className="m-auto bg-stone-200 bg-opacity-100 max-w-[450px] min-h-[320px] mt-10 rounded-xl p-2 flex flex-col items-center shadow-2xl">
        <div className="flex flex-wrap justify-center z-10">
          <div className="p-1">
            <button
              className={` btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Pomodoro" && "btn-active"
              }`}
              onClick={() => {
                handleButtonClick("Pomodoro"), setStartBtn(false);
              }}
            >
              Pomodoro
            </button>
          </div>

          <div className="p-1">
            <button
              className={`btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Short Break" && "btn-active"
              }`}
              onClick={() => {
                handleButtonClick("Short Break"), setStartBtn(false);
              }}
            >
              Short Break
            </button>
          </div>

          <div className="p-1">
            <button
              className={`btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Long Break" && "btn-active"
              }`}
              onClick={() => {
                handleButtonClick("Long Break"), setStartBtn(false);
              }}
            >
              Long Break
            </button>
          </div>
        </div>

        <div className="timer mt-6 text-8xl">{formatTime(timeLeft)}</div>

        <div>
          <button
            className="btn btn-wide h-14 bg-stone-400 hover:bg-stone-500 mt-14 text-3xl text-blue-50"
            onClick={toggleStart}
          >
            {startBtn ? "Pause" : "Start"}
          </button>

          {startBtn && (
            <button
              className="skip-btn"
              onClick={() => {
                handleButtonClick(
                  activeButton === "Pomodoro" ? "Short Break" : "Pomodoro"
                );
                toggleStart();
              }}
            >
              <img
                className="w-18 btn -mt-4 bg-stone-200"
                src="./next.png"
                alt="next image"
              />
            </button>
          )}
        </div>
      </div>

      <div className="counter-container mt-4">
        <button onClick={handleResetRound}>
          <p>{round}#</p>
        </button>

        {activeButton === "Short Break" || activeButton === "Long Break" ? (
          <p className="text-lg">Time for a break!</p>
        ) : (
          <p className="text-lg">Time to focus!</p>
        )}
      </div>
    </div>
  );
}

export default Clock;
