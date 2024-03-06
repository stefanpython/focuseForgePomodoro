import { useEffect, useState } from "react";

function Tasks() {
  return (
    <div className="tasks-container mt-6">
      <div className="flex items-center ">
        <div className="mx-auto flex items-center space-x-60">
          <p>Tasks</p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              id="dropdownButton"
            >
              <img className="w-7" src="./more1.png" alt="more icon" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="divider max-w-96 m-auto"></div>
    </div>
  );
}

export default Tasks;
