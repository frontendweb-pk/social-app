// The `JWT` interface can be found in the `next-auth/jwt` submodule
import { User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
interface UserAttributes {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  mobile: string;
  role_id: number;
  role_name?: string;
  avatar?: object;
  active?: boolean;
  access_token?: string;
  email_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
  expireIn?: number;
}
declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User extends UserAttributes {}

  /**
   * Returned by `useSession`, `auth`, contains information about the active session.
   */
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    // first_name?: string;
    // last_name?: string;
    // role_name?: string;
    // user_id?: string | number;
    // role_id?: string | number;
    // access_token?: string;
    // avatar?: object;

    //
    user: AdapterUser & User;
  }
}
