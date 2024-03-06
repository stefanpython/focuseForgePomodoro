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
    </div>
  );
}

export default Tasks;
