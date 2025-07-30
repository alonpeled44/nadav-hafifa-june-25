import { WindowWidthContextType } from "@/types/contexts";
import { createContext, ReactNode } from "react";

export const WindowWidthContext = createContext<WindowWidthContextType>({
  windowWidth: 0,
  setWindowWidth: () => {},
});

type Props = {
  value: WindowWidthContextType;
  children: ReactNode;
};

export default function WindowWidthContextProvider({ value, children }: Props) {
  return <WindowWidthContext value={value}>{children}</WindowWidthContext>;
}
