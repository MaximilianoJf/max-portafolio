import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProject } from "../hooks/useProject";

export default function RouteWatcher() {
  const location = useLocation();
  const { state, dispatch } = useProject();
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    if (
      prevPathRef.current === "/proyectos" &&
      location.pathname !== "/proyectos" &&
      state.selected !== null
    ) {
      dispatch({ type: "clear-selected-project" });
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, state.selected, dispatch]);

  return null;
}
