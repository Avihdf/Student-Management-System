import React, { useContext, createContext} from "react";

export const AppContext = createContext();

export const useauth = () => useContext(AppContext);

