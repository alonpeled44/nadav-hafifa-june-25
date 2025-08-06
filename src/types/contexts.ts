import { User } from "@/pages/api/users";

export type DisplayNameContextType = {
  displayName: string;
  setDisplayName: (name: string) => void;
};

export type WindowWidthContextType = {
  windowWidth: number;
  setWindowWidth: (width: number) => void;
};
