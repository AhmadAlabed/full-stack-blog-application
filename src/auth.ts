import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import UserModel from "@/models/user";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const SECRET_KEY = process.env.JWT_SECRET as string;
declare module "next-auth" {
  interface Session {
    token?: string;
  }
}
interface ExtendedUser extends User {
  token?: string;
}
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {},
        email: {},
        token: {},
      },
      async authorize(credentials) {
        try {
          // Ensure credentials are provided and valid
          if (
            !credentials?.name ||
            !credentials?.email ||
            !credentials?.token
          ) {
            console.error(
              "Missing required credentials: name, email, or token."
            );
            return null;
          }
          // Create user object if credentials are valid
          const user = {
            name: credentials?.name as string,
            email: credentials?.email as string,
            token: credentials?.token as string,
          };
          return user;
        } catch (error: unknown) {
          // Handle any unexpected errors
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unexpected error occurred during creating credentials";
          console.error(errorMessage);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async signIn({ account, profile, user }) {
      try {
        if (account?.provider === "github" || account?.provider === "google") {
          await connectToDatabase();
          const { email, name } = profile || {};
          if (!email) {
            console.error("No email found in profile.");
            return false;
          }
          const existingUser = await UserModel.findOne({ email });
          if (!existingUser) {
            await UserModel.create({
              email,
              name: name || email.split("@")[0],
            });
          }
          // user.id = existingUser?._id as string;
          if (existingUser?._id instanceof ObjectId) {
            user.id = existingUser._id.toString();
          }
        }
        return true;
      } catch (error) {
        console.error("Error during sign-in process:", error);
        return false;
      }
    },
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        const extendedUser = user as ExtendedUser;
        if (account.provider === "github" || account.provider === "google") {
          const payload = {
            id: extendedUser.id,
            email: extendedUser.email,
          };
          const generatedToken = jwt.sign(payload, SECRET_KEY, {
            expiresIn: "24h",
          });
          return { ...token, token: generatedToken, user: extendedUser };
        }
        return { ...token, token: extendedUser.token, user: extendedUser };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.token = token.token as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
