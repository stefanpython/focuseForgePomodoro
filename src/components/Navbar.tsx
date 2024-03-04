function Navbar() {
  return (
    <div className="navbar navbar-center bg-base-200 space-x-20 sm:space-x-44 md:space-x-96 shadow">
      <div className="navbar-end p-1 pl-12">
        <img
          className="w-10 h-10 animate-bounce"
          src="./logo.png"
          alt="timer clock"
        />
        <span className="text-xl">focuseForge</span>
      </div>

      <div className="navbar-start p-1">
        <button className="btn btn-sm btn-outline btn-warning">Settings</button>
      </div>
    </div>
  );
}

export default Navbar;
