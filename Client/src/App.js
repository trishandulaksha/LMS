import "./App.css";
import LoginScreen from "./screen/loginScreen/loginScreen";
import Navbar from "./screen/Navbar";

import Dashboard from "./dashboard/DashboardHome";
import Sidebar from "./Component/Header/sidebar";

function App() {
  return (
    <div className="">
      <Dashboard />

      <LoginScreen />
    </div>
  );
}

export default App;
