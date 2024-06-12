import { useLocation } from "react-router-dom";

export const useBackPath = () => {
  const location = useLocation();
  var backPath = location.pathname.split("/").slice(0, -1).join("/");

  return backPath;
};