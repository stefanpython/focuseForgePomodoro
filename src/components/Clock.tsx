import { useState, useEffect } from "react";

function Clock() {
  const [activeButton, setActiveButton] = useState<string>("Pomodoro");
  const [startBtn, setStartBtn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  // Create an audio element with the sound file
  const startSound = new Audio("./click.mp3");

  useEffect(() => {
    let intervalId: any;

    if (startBtn && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
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

  return (
    <div className="clock-container pl-2 pr-2">
      <div className="m-auto bg-stone-200 bg-opacity-100 max-w-[450px] min-h-[320px] mt-10 rounded-xl p-2 flex flex-col items-center shadow-2xl">
        <div className="flex flex-wrap justify-center z-10">
          <div className="p-1">
            <button
              className={` btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Pomodoro" && "btn-active"
              }`}
              onClick={() => {
                handleButtonClick("Pomodoro"), setStartBtn(!startBtn);
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
                handleButtonClick("Short Break"), setStartBtn(!startBtn);
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
                handleButtonClick("Long Break"), setStartBtn(!startBtn);
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
    </div>
  );
}

export default Clock;
