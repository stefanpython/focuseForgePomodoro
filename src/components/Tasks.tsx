import { useEffect, useState, useRef } from "react";

interface FormData {
  pomodoros: string;
  task: string;
  note: string;
}

function Tasks() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    pomodoros: "1",
    task: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    setFormData({ ...formData, note: "" });
    setShowNoteInput(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  // Close dropdown when pressing button 2 times
  // or when pressing on a list item
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle show task form
  const handleShowTaskForm = () => {
    setShowTaskForm(!showTaskForm);
  };

  return (
    <div className="tasks-container mt-6">
      <div className="flex items-center ">
        <div className="mx-auto flex items-center space-x-60">
          <p>Tasks</p>

          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              id="dropdownButton"
              onClick={toggleDropdown}
            >
              <img className="w-7" src="./more1.png" alt="more icon" />
            </div>
            {isOpen && (
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                onClick={closeDropdown}
              >
                <li>
                  <a>
                    <img
                      className="w-4"
                      src="./trashcan.png"
                      alt="trashcan image"
                    />
                    Clear finished tasks
                  </a>
                </li>

                <li>
                  <a>
                    <img
                      className="w-4"
                      src="./trashcan.png"
                      alt="trashcan image"
                    />
                    Clear all tasks
                  </a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="divider max-w-96 m-auto"></div>

      <div className="task flex flex-wrap justify-center pb-4">
        <div className="flex items-center border-2 shadow-lg min-h-14 w-full max-w-[420px] rounded-md border-l-emerald-500 border-l-8">
          <div className="left ml-2">
            {checked ? (
              <img
                className="w-6 flex justify-start hover:bg-slate-200 rounded-full cursor-pointer"
                src="./check2.png"
                alt="checked image"
                onClick={() => setChecked(!checked)}
              />
            ) : (
              <img
                className="w-6 flex justify-start hover:bg-slate-200 rounded-full cursor-pointer"
                src="./check.png"
                alt="checked image"
                onClick={() => setChecked(!checked)}
              />
            )}
          </div>

          <div className="center flex p-3 pl-2 pr-3">
            <h5 className="break-words max-w-[290px] text-left">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h5>
          </div>

          <div className="right flex items-center">
            <span className="font-semibold text-gray-400">0/1</span>

            <button className="right border-1 hover:bg-stone-300 p-1 rounded-sm ml-1">
              <img className="w-6" src="./more1.png" alt="more icon" />
            </button>
          </div>
        </div>
      </div>

      {showTaskForm && (
        <div className="task-form-container">
          <form
            onSubmit={handleSubmit}
            className="card w-96 bg-base-100 shadow-xl m-auto"
          >
            <div className="card-body">
              <h2 className="card-title">
                <input
                  type="text"
                  name="task"
                  onChange={handleChange}
                  className="input input-bordered mr-2 w-full"
                  placeholder="What are you working on?"
                />
              </h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Est. Pomodoros</span>
                </label>
                <input
                  type="number"
                  name="pomodoros"
                  value={formData.pomodoros}
                  onChange={handleChange}
                  className="input input-bordered w-20"
                />
              </div>

              {showNoteInput && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Note</span>
                  </label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    className="input input-bordered"
                  />
                </div>
              )}

              {!showNoteInput && (
                <div className="form-control mt-2">
                  <button type="button" onClick={handleAddNote}>
                    <p className="flex text-md underline">&#x2b; Add Note</p>
                  </button>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button type="button" onClick={handleShowTaskForm} className="">
                  <p className="font-medium text-gray-400 hover:bg-slate-100 rounded-md ml-2 h-8 w-24 flex items-center justify-center">
                    Cancel
                  </p>
                </button>

                <button
                  type="submit"
                  className="bg-slate-700 rounded-md ml-2 h-8 w-24"
                >
                  <p className="text-white font-medium">Save</p>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!showTaskForm && (
        <button
          className="btn bg-sky-500 hover:bg-sky-400 w-full h-14 sm:max-w-[30em] sm:h-[4.5em] border-dashed border-2"
          onClick={handleShowTaskForm}
        >
          <img className="w-8" src="./plus1.png" alt="plus image" />
          <p className="text-white text-lg">Add Task</p>
        </button>
      )}
    </div>
  );
}

export default Tasks;
