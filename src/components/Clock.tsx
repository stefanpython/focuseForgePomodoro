function Clock() {
  return (
    <div className="clock-container pl-2 pr-2 ">
      <div className="m-auto bg-yellow-100 bg-opacity-50 max-w-[450px] min-h-[320px] mt-10 rounded-xl p-2 flex justify-center">
        <div className="p-1">
          <button className="btn btn-sm btn-outline btn-accent text-red-100">
            Pomodoro
          </button>
        </div>

        <div className="p-1">
          <button className="btn btn-sm btn-outline btn-accent text-red-100">
            Short Break
          </button>
        </div>

        <div className="p-1">
          <button className="btn btn-sm btn-outline btn-accent text-red-100">
            Long break
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clock;
