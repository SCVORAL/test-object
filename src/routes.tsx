import type { RouteObject } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";

export const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/events", element: <>Events Events Events</> },
      { path: "/help", element: <>Help Help Help</> },
      {
        path: "/notifications",
        element: <>notification notification notification</>,
      },
      { path: "/profile", element: <>profile profile profile </> },
    ],
  },
];
