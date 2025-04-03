import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/app/_lib/auth"

// export function middleware(request: NextRequest) {
//   console.log("🚀 ~ middleware ~ request:", request)

//   return NextResponse.redirect(new URL("/about"), request.url)
// }

export const middleware = auth

export const config = {
  // routes where the middleware runs before
  matcher: ["/account", "/cabins"],
}
