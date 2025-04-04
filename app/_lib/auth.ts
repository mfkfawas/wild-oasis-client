import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // for middleware
    authorized({ auth, request }) {
      return !!auth?.user
    },
  },
  pages: {
    // /login is the custom redirection route to override the default sign in page that google provided.
    signIn: "/login",
  },
}

export const {
  // auth can always give us the current session
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig)
