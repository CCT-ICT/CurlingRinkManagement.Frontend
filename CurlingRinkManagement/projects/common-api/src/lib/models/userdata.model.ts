import { User } from "./user.model";

export class UserData {
  next: number = 0;
  previous: number = 0;
  count: number = 0;
  current: number = 0;
  totalPages: number = 0;
  startIndex: number = 0;
  endIndex: number = 0;
  users: User[] = [];
}