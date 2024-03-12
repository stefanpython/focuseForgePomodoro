import "./App.css";
import "./index.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";

function App() {
  // DaisyUI modal
  const openModal = () => {
    const modal = document.getElementById("settings");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error("Element with ID 'settings' is not a modal");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      {/* Navbar container */}
      <div className="navbar navbar-center bg-base-200 space-x-20 sm:space-x-44 md:space-x-96 shadow">
        <div className="navbar-end p-3 pl-12">
          <img
            className="w-10 h-10 animate-bounce"
            src="./logo.png"
            alt="timer clock"
          />
          <span className="text-xl">focuseForge</span>
        </div>

        <div className="navbar-start p-1">
          <button
            className="btn btn-sm btn-outline btn-warning"
            onClick={openModal}
          >
            Settings
          </button>

          <dialog id="settings" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">
                Press ESC key or click the button below to close
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>

      <Clock />

      <Tasks />
    </div>
  );
}

export default App;
