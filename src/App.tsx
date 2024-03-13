import "./App.css";
import "./index.css";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";

function App() {
  // Handle opening settings modal
  const openModal = () => {
    const modal = document.getElementById("settings");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error("Element with ID 'settings' is not a modal");
    }
  };

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
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={handleCloseModal}
              >
                X
              </button>

              <div className="divider divider-warning">Settings</div>

              <div className="modal-action">
                <form
                  onSubmit={handleModalSubmit}
                  method="dialog"
                  className="flex flex-col justify-start"
                >
                  {/* Move timer-container to the left */}
                  <div className="timer-container flex flex-col w-full md:w-auto md:flex-initial md:mr-40">
                    <div className="timer flex flex-col items-start">
                      <span className="flex">
                        <img
                          className="w-6 mr-1"
                          src="./stopwatch.png"
                          alt="stopwatch image"
                        />
                        TIMER (minutes)
                      </span>
                    </div>

                    <div className="timer-inputs flex">
                      <div className="form-control p-2">
                        <label className="label">
                          <span className="label-text">Pomodoro</span>
                        </label>

                        <input
                          type="number"
                          name="pomodoro"
                          className="input input-bordered w-16 sm:w-20 h-10 bg-slate-100"
                        />
                      </div>

                      <div className="form-control p-2">
                        <label className="label">
                          <span className="label-text">Short Break</span>
                        </label>

                        <input
                          type="number"
                          name="short"
                          className="input input-bordered w-16 sm:w-20 h-10 bg-slate-100"
                        />
                      </div>

                      <div className="form-control p-2">
                        <label className="label">
                          <span className="label-text">Long Break</span>
                        </label>

                        <input
                          type="number"
                          name="long"
                          className="input input-bordered w-16 sm:w-20 h-10 bg-slate-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="divider divider-neutral"></div>

                  <div className="sound-container">
                    <div className="sound flex flex-col items-start">
                      <span className="flex items-center">
                        <img
                          className="w-5 h-5 mr-1"
                          src="./volume.png"
                          alt="volume image"
                        />
                        VOLUME
                      </span>
                    </div>

                    <br />

                    <div className="alarm-container flex justify-between">
                      <label htmlFor="alarm">Alarm sound</label>
                      <select className="select select-bordered w-44 max-w-xs">
                        <option disabled selected>
                          Select alarm
                        </option>
                        <option>Bird</option>
                        <option>Digital</option>
                        <option>Kitchen</option>
                        <option>Modern</option>
                        <option>Owl</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="btn">
                      Ok
                    </button>
                  </div>
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
