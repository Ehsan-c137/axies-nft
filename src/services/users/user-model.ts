import { allUsers } from "@/mocks/data";

export type TUserFull = (typeof allUsers)[0] & {
  status: number;
};

export interface UserM {
  name: string;
  username: string;
  balance: string;
  profileLink: string;
  walletLink: string;
}
