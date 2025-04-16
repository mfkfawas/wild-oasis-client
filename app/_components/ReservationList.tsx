"use client"

import ReservationCard from "./ReservationCard"
import { deleteBooking } from "../_lib/actions"

import { useOptimistic } from "react"

function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    // current state - it will be the state unless the corr async operation is happening
    bookings,
    // state updater function, which will determine the next optimistic state. It always takes the current state and some new information that is necessary to compute the optimistic state.
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId)
    }
  )

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId)
    await deleteBooking(bookingId)
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  )
}

export default ReservationList
