"use client"

import { PropsWithChildren } from "react"
import { useFormStatus } from "react-dom"

interface SubmitButtonProps {
  pendingLabel: string
}

export default function SubmitButton({
  children,
  pendingLabel,
}: PropsWithChildren<SubmitButtonProps>) {
  // If we use server action as the action prop of a form, then this is the way to go.
  // Its necessary to use this hook inside a seperate component like this which is inside a <form>.
  // Purpose: Track the status (e.g., pending) of a specific <form> in React Server Components.
  // Key Limitation: Only works inside a <form> (child components).
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </button>
  )
}
