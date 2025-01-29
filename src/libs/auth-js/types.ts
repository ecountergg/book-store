import { Account, CredentialsSignin, Profile, User as NextAuthUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

interface BaseJWT extends Record<string, unknown>, DefaultJWT {
  access_token: string;
  expires_at?: number;
  refresh_token?: string | undefined;
  error?: unknown;
}

export class InvalidLoginError extends CredentialsSignin {
  code = 'Invalid identifier or password';
}

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    expiresIn?: number;
  }
  interface Session {
    accessToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends BaseJWT {}
}

export type JWTCallbackParams = {
  token: BaseJWT;
  user: NextAuthUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: 'signIn' | 'signUp' | 'update' | undefined;
  isNewUser?: boolean | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session?: any;
};
