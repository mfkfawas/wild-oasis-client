import NextAuth, { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import { createGuest } from "./data-service"
import { getGuest } from "./data-service"

const authConfig: NextAuthConfig = {
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
    // This callback will be called after each signin, as per our bsiness logic, if there is no existing guest, we will create a new guest.
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email)

        if (!existingGuest) await createGuest({ email: user.email, fullName: user.name })

        return true
      } catch {
        return false
      }
    },
    // This callback will be called by auth.js after each time our session is ready, we r mutating the session and appending the guestId as we need the guestId with session in multiple places in our app.
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
