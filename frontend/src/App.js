import "./App.css";
import DashboardView from "./views/Dashboard/DashboardView";
import LobbyView from "./views/Lobby/LobbyView";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardView />} />
      <Route path="/play" element={<LobbyView />} />
    </Routes>
  );
}

export default App;
