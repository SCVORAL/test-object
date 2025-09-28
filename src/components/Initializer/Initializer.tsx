import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { createNewServer } from "../../utils/serverGenerators";
import { setInitialData } from "../../store/slices/serversSlice";

export default function Initializer() {
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

  return null;
}
