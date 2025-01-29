/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import NextAuth from "next-auth";

import { CredentialsProvider } from "./credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [CredentialsProvider],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
    newUser: "/register",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.userId = token.id as string;
      }

      return session;
    },
    authorized(params) {
      const isAuthenticated = !!params.auth?.user;

      return isAuthenticated;
    },
  },
});
