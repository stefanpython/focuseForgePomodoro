import { useEffect, useState, useRef } from "react";

function Tasks() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

      <div className="tast-container hidden">Tasks</div>

      <button className="btn bg-sky-500 hover:bg-sky-400 w-full h-14 sm:max-w-[30em] sm:h-[4.5em] border-dashed border-2">
        <img className="w-8" src="./plus1.png" alt="plus image" />
        <p className="text-white text-lg">Add Task</p>
      </button>
    </div>
  );
}

export default Tasks;
