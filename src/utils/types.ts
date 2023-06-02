export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "user" | "admin";
};
