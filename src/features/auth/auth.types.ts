export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: "Admin";
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult = {
  token: string;
  user: AuthUser;
};
