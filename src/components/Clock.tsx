import { useState } from "react";

function Clock() {
  const [activeButton, setActiveButton] = useState<string>("Pomodoro");
  const [startBtn, setStartBtn] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const toggleStart = () => {
    setStartBtn(!startBtn);
  };

  return (
    <div className="clock-container pl-2 pr-2">
      <div className="m-auto bg-stone-200 bg-opacity-50 max-w-[450px] min-h-[320px] mt-10 rounded-xl p-2 flex flex-col items-center shadow-2xl">
        <div className="flex flex-wrap justify-center">
          <div className="p-1">
            <button
              className={`btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Pomodoro" && "btn-active"
              }`}
              onClick={() => handleButtonClick("Pomodoro")}
            >
              Pomodoro
            </button>
          </div>

          <div className="p-1">
            <button
              className={`btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Short Break" && "btn-active"
              }`}
              onClick={() => handleButtonClick("Short Break")}
            >
              Short Break
            </button>
          </div>

          <div className="p-1">
            <button
              className={`btn btn-sm btn-outline btn-info text-red-100 ${
                activeButton === "Long Break" && "btn-active"
              }`}
              onClick={() => handleButtonClick("Long Break")}
            >
              Long Break
            </button>
          </div>
        </div>

        <div className="timer mt-6 text-8xl">
          {activeButton === "Pomodoro" && `25:00`}
          {activeButton === "Short Break" && `5:00`}
          {activeButton === "Long Break" && `15:00`}
        </div>

        <div>
          <button
            className="btn btn-wide h-14 bg-stone-400 hover:bg-stone-500 mt-14 text-3xl text-blue-50"
            onClick={toggleStart}
          >
            {startBtn ? "Start" : "Pause"}
          </button>

          {!startBtn && (
            <button className="skip-btn">
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
