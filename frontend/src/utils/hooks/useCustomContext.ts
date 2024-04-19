import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import { AuthTypeContext } from "../../../types/Context";

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context as AuthTypeContext;
}
