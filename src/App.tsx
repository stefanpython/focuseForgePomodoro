import "./App.css";
import "./index.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    pomodoro: 25,
    short: 5,
    long: 15,
  });

  // Handle closing settings modal by pressing X
  const handleCloseModal = () => {
    const modal = document.getElementById("settings");
    if (modal) {
      (modal as HTMLDialogElement).close();
    }
  };

  // Handle form submit in the settings modal
  const handleModalSubmit = (values: FormData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ...values,
    }));
  };

  return (
    <div className="bg-base-200 min-h-screen">
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
