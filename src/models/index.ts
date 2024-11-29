export interface View {
  title: string;
  to: string;
  icon: JSX.Element;
}

export enum Role {
  Admin = "admin",
  User = "user",
}
export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  role: Role;
}
