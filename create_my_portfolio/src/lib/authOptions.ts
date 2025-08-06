import Credentials from "next-auth/providers/credentials";
import connectDB from "./connectDB";
import { User } from "@/models";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Inside authorize()");

        const identifier = credentials?.identifier;
        const password = credentials?.password;

        if (!identifier || !password) {
          console.log("Missing identifier or password");
          return null;
        }

        await connectDB();

        const user = await User.findOne({
          $or: [{ email: identifier }, { username: identifier }],
        });

        console.log("User found:", user);

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (!user.password) {
          console.log(
            'Signed up via OAuth (Google/GitHub). Please log in with the same provider or set a password in your profile.'
          );
          return null;
        }

        const correctPassword = await user.comparePassword(password);

        if (!correctPassword) {
          console.log("Incorrect password");
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }

      if (user) {
        console.log("inside jwt user:", user);
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.hasPortfolio = user.hasPortfolio;
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        console.log("inside session() token:", token);
        session.user.provider = token.provider;
        session.user._id = token._id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.hasPortfolio = token.hasPortfolio;
      }

      return session;
    },
  },
};
