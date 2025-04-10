import Link from "next/link"
import { auth } from "../_lib/auth"
import Image from "next/image"

export default async function Navigation() {
  //  whenever we do this in a component, it will make the entire route dynamic.
  //  because this authentication works with cookies and headers. Coz,the auth fn
  // need to read these cookies from the incoming request.
  //  Reading cookies will switches the route to dynamic rendering.
  // Also, this Navigation is part of the whole layout and now all the routes of our app is dynamic.
  const session = await auth()

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins" className="hover:text-accent-400 transition-colors">
            Cabins
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accent-400 transition-colors">
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link href="/account" className="hover:text-accent-400 transition-colors flex items-center gap-4">
              <Image
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name as string}
                width={32}
                height={32}
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link href="/account" className="hover:text-accent-400 transition-colors">
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  )
}
