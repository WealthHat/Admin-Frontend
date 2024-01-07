import { createContext, useReducer } from "react";
import reducers from "./Reducers";

export const DataContext = createContext(null);

export const DataProvider = ({ children }: any) => {
  const initialState = {
    user: null,
    token: null,
    pageloading: true,
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
