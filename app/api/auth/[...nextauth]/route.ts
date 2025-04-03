// [...nextauth] - is called 'catch all' segment. All apis that starts with '/api/auth/...whatever'(eg: api/auth/signin, api/auth/signout)
// will be handled by this route.ts

export { GET, POST } from "@/app/_lib/auth";
