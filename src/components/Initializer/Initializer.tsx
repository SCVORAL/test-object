import { type ReactNode, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { createNewServer } from "../../utils/serverGenerators";
import { setInitialData } from "../../store/slices/serversSlice";

interface InitializerProps {
  children: ReactNode;
}

export default function Initializer({ children }: InitializerProps) {
  const dispatch = useAppDispatch();
  const servers = useAppSelector((state) => state.servers.list);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && (!servers || servers.length === 0)) {
      const generatedServers = Array.from({ length: 5 }, () =>
        createNewServer({})
      );
      dispatch(setInitialData(generatedServers));
      initialized.current = true;
    }
  }, [dispatch, servers]);

  return <>{children}</>;
}
