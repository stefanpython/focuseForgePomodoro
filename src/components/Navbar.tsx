import React, { useState, useEffect } from "react";

interface NavbarProps {
  pomodoroDefault: number;
  shortBreakDefault: number;
  longBreakDefault: number;
  handleModalSubmit: (values: {
    pomodoro: number;
    short: number;
    long: number;
    alarmSound: string;
    theme: string;
  }) => void;
  handleCloseModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  pomodoroDefault,
  shortBreakDefault,
  longBreakDefault,
  handleModalSubmit,
  handleCloseModal,
}) => {
  const [formData, setFormData] = useState({
    pomodoro: pomodoroDefault,
    short: shortBreakDefault,
    long: longBreakDefault,
    alarmSound: "",
    theme: "light",
  });

  // Update theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", formData.theme);
  }, [formData]);

  // Update form input values
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle alarm sound selection
  const handleAlarmSoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      alarmSound: value,
    }));
  };

  // Handle alarm sound selection
  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      theme: value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleModalSubmit(formData);
    handleCloseModal();
  };

  // Handle opening settings modal
  const openModal = () => {
    const modal = document.getElementById("settings");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    } else {
      console.error("Element with ID 'settings' is not a modal");
    }
  };

  return (
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

            <div className="divider divider-warning text-gray-400 text-lg font-medium">
              Settings
            </div>

            <div className="modal-action">
              <form
                onSubmit={handleSubmit}
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
                        defaultValue={pomodoroDefault}
                        onChange={handleInputChange}
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
                        defaultValue={shortBreakDefault}
                        onChange={handleInputChange}
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
                        defaultValue={longBreakDefault}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="sound-container">
                  <div className="sound flex flex-col items-start">
                    <span className="flex items-center">
                      <img
                        className="w-5 h-5 mr-1"
                        src="./volume.png"
                        alt="volume image"
                      />
                      SOUND
                    </span>
                  </div>

                  <br />

                  <div className="alarm-container flex justify-between">
                    <label htmlFor="alarm">Alarm sound</label>
                    <select
                      className="select select-bordered w-44 max-w-xs"
                      defaultValue={"Select alarm"}
                      onChange={handleAlarmSoundChange}
                    >
                      <option disabled>Select alarm</option>
                      <option value="bird">Bird</option>
                      <option value="digital">Digital</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="modern">Modern</option>
                      <option value="owl">Owl</option>
                    </select>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="color-container">
                  <div className="theme flex flex-col items-start">
                    <span className="flex items-center">
                      <img
                        className="w-6 h-6 mr-1"
                        src="./theme.png"
                        alt="theme image"
                      />
                      THEME
                    </span>
                  </div>

                  <br />

                  <div className="theme-container flex justify-between">
                    <label htmlFor="theme">Theme</label>
                    <select
                      className="select select-bordered w-44 max-w-xs"
                      defaultValue={"Select theme"}
                      onChange={handleThemeChange}
                    >
                      <option disabled>Select theme</option>
                      <option value="light">Light</option>
                      <option value="retro">Retro</option>
                      <option value="valentine">Valentine</option>
                      <option value="aqua">Aqua</option>
                      <option value="coffee">Coffee</option>
                      <option value="synthwave">Synthwave</option>
                    </select>
                  </div>
                </div>

                <br />

                <br />

                <br />

                <div className="flex justify-end items-center mt-12 absolute bottom-0 left-0 right-0 h-16 bg-blue-400 ">
                  <button type="submit" className="btn mr-5">
                    Ok
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Navbar;
