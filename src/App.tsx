import "./App.css";
import "./index.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App() {
  // Set default values for Pomodoro, Short Break, and Long Break
  const pomodoroDefault = 25;
  const shortBreakDefault = 5;
  const longBreakDefault = 15;

  // Handle closing settings modal by pressing X
  const handleCloseModal = () => {
    const modal = document.getElementById("settings");
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };

  const handleModalSubmit = () => {
    console.log("form submite");
  };
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Navbar container */}

      <Navbar
        pomodoroDefault={pomodoroDefault}
        shortBreakDefault={shortBreakDefault}
        longBreakDefault={longBreakDefault}
        handleModalSubmit={handleModalSubmit}
        handleCloseModal={handleCloseModal}
      />

      <Clock
        pomodoroDefault={pomodoroDefault}
        shortBreakDefault={shortBreakDefault}
        longBreakDefault={longBreakDefault}
      />

      <Tasks />
    </div>
  );
}

export default App;
