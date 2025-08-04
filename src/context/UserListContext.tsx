import { User } from "@/pages/api/users";
import { createContext, ReactNode } from "react";

const dummyUser: User = {
  id: 0,
  username: "!!!",
  password: "!!!",
  theme: "light",
  fontSize: "medium",
};

export const UserListContext = createContext<User[]>([dummyUser]);

type Props = {
  value: User[];
  children: ReactNode;
};

export default function UserListContextProvider({ value, children }: Props) {
  return <UserListContext value={value}>{children}</UserListContext>;
}
