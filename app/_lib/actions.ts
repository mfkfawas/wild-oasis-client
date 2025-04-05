"use server"

import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase"

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}

export async function updateGuest(formData) {
  const session = await auth()

  // its a common practice to not use try catch, instead throw Error directly, then they will be caught by closest error boundary.
  if (!session) throw new Error("You must be logged in")

  const nationalID = formData.get("nationalID")
  const [nationality, countryFlag] = formData.get("nationality").split("%")

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) throw new Error("Please provide a valid national ID")

  const updateData = { nationality, countryFlag, nationalID }

  const { data, error } = await supabase.from("guests").update(updateData).eq("id", session!.user!.guestId)

  if (error) throw new Error("Guest could not be updated")

  // NOTE: manual cache revalidation.(This is the second type of revalidation) ---- FYI 1st type is time based that we discussed earlier.
  revalidatePath("/account/profile")
}
