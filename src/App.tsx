import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div>
      <h1>Pomodoro</h1>
      <Navbar />
      <Clock />
      <Tasks />
    </div>
  );
}

export default App;
