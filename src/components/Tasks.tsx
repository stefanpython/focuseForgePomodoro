import { useEffect, useState, useRef } from "react";

interface FormData {
  pomodoros: string;
  task: string;
  note: string;
  checked: boolean;
}

function Tasks() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showNoteInput, setShowNoteInput] = useState<boolean>(false);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [tasks, setTasks] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    pomodoros: "1",
    task: "",
    note: "",
    checked: false,
  });
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  ); // Track which task's "more" button is clicked

  const handleFormRef = (formElement: any) => {
    if (showTaskForm && formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    setFormData({ ...formData, note: "" });
    setShowNoteInput(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const existingTasksString = localStorage.getItem("tasks");
    const existingTasks: FormData[] = existingTasksString
      ? JSON.parse(existingTasksString)
      : [];

    let updatedTasks: FormData[];

    if (selectedTaskIndex !== null) {
      // If editing an existing task, update the corresponding task
      updatedTasks = [...existingTasks];
      updatedTasks[selectedTaskIndex] = { ...formData };
    } else {
      // If adding a new task, append it to the existing tasks array
      updatedTasks = [...existingTasks, { ...formData, checked: false }];
    }

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
    setShowTaskForm(false); // Close the task form after saving
  };

  // Retrieve tasks from localStorage on mount
  useEffect(() => {
    const existingTasksString = localStorage.getItem("tasks");
    if (existingTasksString) {
      setTasks(JSON.parse(existingTasksString));
    }
  }, []);

  // Close dropdown if clicked ouside it
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

  // Handle show taks form when pressing edit button on task
  const handleShowTaskForm = (index: number) => {
    setShowTaskForm(true);
    setSelectedTaskIndex(index); // Set the index of the selected task
    setFormData({ ...tasks[index] }); // Pre-populate form data with the selected task
  };

  // Handle opening add task form
  const handleAddTaskForm = () => {
    setShowTaskForm(true);
    setSelectedTaskIndex(null); // Reset the selected task index
    setFormData({
      // Reset form data to default values
      pomodoros: "1",
      task: "",
      note: "",
      checked: false,
    });
  };

  // Handle checked/unchecked button on tasks
  const handleToggleChecked = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );

    const updatedTasks = [...tasks];
    updatedTasks[index].checked = !updatedTasks[index].checked;
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowTaskForm(false);
  };

  return (
    <div className="tasks-container mt-6">
      <div className="flex items-center">
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

      <div className="tasks-container mt-6">
        {tasks
          .slice()
          .reverse()
          .map((task, index) => {
            const originalIndex = tasks.length - 1 - index;
            return (
              <div
                key={index}
                className="task flex flex-wrap justify-center pb-4"
              >
                <div
                  className={
                    !task.checked
                      ? `flex items-center border-2 shadow-lg min-h-14 w-full max-w-[420px] rounded-md border-l-emerald-500 border-l-8`
                      : `flex items-center border-2 shadow-lg min-h-14 w-full max-w-[420px] rounded-md border-l-slate-400 border-l-8`
                  }
                >
                  <div className="left ml-2">
                    {task.checked ? (
                      <img
                        className="w-6 flex justify-start hover:bg-slate-200 rounded-full cursor-pointer"
                        src="./check2.png"
                        alt="checked image"
                        onClick={() => handleToggleChecked(originalIndex)}
                      />
                    ) : (
                      <img
                        className="w-6 flex justify-start hover:bg-slate-200 rounded-full cursor-pointer"
                        src="./check.png"
                        alt="checked image"
                        onClick={() => handleToggleChecked(originalIndex)}
                      />
                    )}
                  </div>

                  <div className="center flex flex-col p-3 pl-2 pr-2">
                    <h5 className="break-words max-w-[290px] text-left font-semibold text-gray-600 text-xl">
                      {task.task}
                    </h5>

                    <div
                      className={
                        task.note
                          ? `bg-yellow-100 p-1 rounded-sm w-[300px]`
                          : ""
                      }
                    >
                      <p className="text-sm text-left">{task.note}</p>
                    </div>
                  </div>

                  <div className="right flex items-center flex-grow justify-end">
                    <span className="font-semibold text-gray-400">
                      0/{task.pomodoros}
                    </span>

                    <button
                      className="right border-1 hover:bg-stone-300 p-1 rounded-sm ml-1"
                      onClick={() => handleShowTaskForm(originalIndex)}
                    >
                      <img className="w-6" src="./more1.png" alt="more icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      <div className="task-form-container" ref={handleFormRef}>
        {showTaskForm && (
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
                  value={formData.task}
                  className="input input-bordered mr-2 w-full"
                  placeholder="What are you working on?"
                  autoFocus
                  required
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
                {selectedTaskIndex !== null && ( // Only show delete button if editing an existing task
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(selectedTaskIndex)}
                    className="bg-red-500 rounded-md mr-10 h-8 w-24"
                  >
                    <p className="text-white font-medium">Delete</p>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowTaskForm(false)}
                  className=""
                >
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
        )}
      </div>

      {!showTaskForm && (
        <button
          className="btn bg-sky-500 hover:bg-sky-400 w-full h-14 sm:max-w-[30em] sm:h-[4.5em] border-dashed border-2"
          onClick={handleAddTaskForm}
        >
          <img className="w-8" src="./plus1.png" alt="plus image" />
          <p className="text-white text-lg">Add Task</p>
        </button>
      )}
    </div>
  );
}

export default Tasks;
