import { createContext } from "react";

export const WindowWidthContext = createContext();

export default function WindowWidthContextProvider({ value, children }) {
  return <WindowWidthContext value={value}>{children}</WindowWidthContext>;
}
