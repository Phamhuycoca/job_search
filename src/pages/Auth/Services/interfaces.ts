import type { IUser } from "@/common/interfaces";

export type IBodyLogin = {
  email?: string;
  password?: string;
  code?: string;
  redirectUri?: string;
};

export type ILoginResponse = {
 data:{
  accessToken: string;
  expiresIn: number;
  refresh_token: string;
  refresh_expiresIn:number;
  profile:IUser;
 }
};


