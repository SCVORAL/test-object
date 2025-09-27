import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import { useAppDispatch } from "./store/hooks/useAppDispatch";
import { useAppSelector } from "./store/hooks/useAppSelector";
import { useEffect } from "react";
import { setInitialData } from "./store/slices/serversSlice";
import { createNewServer } from "./utils/serverGenerators";

function App() {
  const dispatch = useAppDispatch();
  const servers = useAppSelector((state) => state.servers.list);

  useEffect(() => {
    if (!servers || servers.length === 0) {
      const generatedServers = Array.from({ length: 5 }, () =>
        createNewServer({})
      );
      dispatch(setInitialData(generatedServers));
    }
  }, [dispatch, servers]);

  return (
    <div>
      <Header />

      <main>
        <Outlet />
        {/* <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button> */}
      </main>
    </div>
  );
}

export default App;
