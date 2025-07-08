import { createContext } from "react";

export const DisplayNameContext = createContext();

export default function DisplayNameContextProvider({ value, children }) {
  return <DisplayNameContext value={value}>{children}</DisplayNameContext>;
}
