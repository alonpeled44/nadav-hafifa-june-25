import { DisplayNameContextType } from "@/types/contexts";
import { createContext, ReactNode } from "react";

export const DisplayNameContext = createContext<DisplayNameContextType>({
  displayName: "",
  setDisplayName: () => {},
});

type Props = {
  value: DisplayNameContextType;
  children: ReactNode;
};

export default function DisplayNameContextProvider({ value, children }: Props) {
  return <DisplayNameContext value={value}>{children}</DisplayNameContext>;
}
