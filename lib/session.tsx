
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';
import { getServerSession } from "next-auth";
import { SessionInterface } from "@/common.types";

// Export the authentication options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  jwt: {
    // encode: ({ secret, token }) => {
    //   // Encode logic
    // },
    // decode: async ({ secret, token }) => {
    //   // Decode logic
    // }
  },
  theme: {
    colorScheme: 'light',
    logo: '/logo.png'
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // Get the user if they exist

        // If they don't exist, create them

        // Return true
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }
};

// Export an asynchronous function to get the current user session
export async function getCurrentUser(): Promise<SessionInterface | null> {
  try {
    // Fetch the session using getServerSession
    const session = await getServerSession({ req: null, res: null }, authOptions);

    // Return the session
    return session as SessionInterface | null;
  } catch (error) {
    // Handle errors or log them
    console.error("Error fetching session:", error);
    return null;
  }
}