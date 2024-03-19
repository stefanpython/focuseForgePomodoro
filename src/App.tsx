import "./App.css";
import "./index.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";

interface FormDataState {
  pomodoro: number;
  short: number;
  long: number;
  alarmSound: string;
  theme: string;
}

function App() {
  // Retrieve timer settings from localStorage or use default values
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("settings");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      return {
        pomodoro: 25,
        short: 5,
        long: 15,
        theme: "",
        alarmSound: "",
      };
    }
  });

  // Handle closing settings modal by pressing X
  const handleCloseModal = () => {
    const modal = document.getElementById("settings");
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };

  // Save timer settings to localStorage when formData changes
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(formData));
  }, [formData]);

  // Handle form submit in the settings modal
  const handleModalSubmit = (values: {
    pomodoro: number;
    short: number;
    long: number;
    alarmSound: string;
    theme: string;
  }) => {
    setFormData((prevFormData: FormDataState) => ({
      ...prevFormData,
      ...values,
    }));
  };

  return (
    <div className="bg-base-200 min-h-screen -mr-2 sm:mr-0">
      {/* Navbar container */}

      <Navbar
        pomodoroDefault={formData.pomodoro}
        shortBreakDefault={formData.short}
        longBreakDefault={formData.long}
        handleModalSubmit={handleModalSubmit}
        handleCloseModal={handleCloseModal}
      />

      <Clock formData={formData} />

      <Tasks />
    </div>
  );
}

export default App;
