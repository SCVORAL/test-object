import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Initializer from "./components/Initializer";

function App() {
  return (
    <div>
      <Initializer />

      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
