import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest } from "./data-service"
import { getGuest } from "./data-service"

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
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email)

        if (!existingGuest) await createGuest({ email: user.email, fullName: user.name })

        return true
      } catch {
        return false
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email)
      session.user.guestId = guest.id
      return session
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
