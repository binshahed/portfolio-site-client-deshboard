export type TUserLogin = {
  id: string;
  password: string;
};

export type TUser = {
  userId: string;
  role: string;
};

export type TUserData = {
  data: {
    userId: string;
    role: string;
  };
  iat: number;
  exp: number;
};
