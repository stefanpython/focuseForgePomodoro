import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar";
import Clock from "./components/Clock";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="bg-base-200 h-screen">
      <Navbar />

      <Clock />

      <Tasks />
    </div>
  );
}

export default App;
