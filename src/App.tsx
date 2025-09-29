import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Initializer from "./components/Initializer";

function App() {
  return (
    <Initializer>
      <Header />
      <main>
        <Outlet />
      </main>
    </Initializer>
  );
}

export default App;
