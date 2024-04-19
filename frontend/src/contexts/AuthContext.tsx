import React from "react";
import { AuthTypeContext } from "../../types/Context";

const AuthContext = React.createContext<AuthTypeContext | null>(null);

export default AuthContext;
