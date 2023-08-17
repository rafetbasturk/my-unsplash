import { useContext } from "react";
import { AlertContext } from "../contexts/alertContext";

const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined)
    throw new Error("AlertContext is used outside of AlertProvider.");
  return context;
};

export default useAlert;
