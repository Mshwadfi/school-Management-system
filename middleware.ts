import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/constants";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log("Matchers:", matchers);

export default clerkMiddleware(async (auth, req) => {
    const { sessionClaims } = await auth(); // Await auth to ensure sessionClaims is populated
    console.log("Session Claims:", sessionClaims);
    const role = (sessionClaims?.metadata as { role?: string })?.role;
    console.log("User Role:", role);
  
    if (role) {
      for (const { matcher, allowedRoles } of matchers) {
        if (matcher(req) && !allowedRoles.includes(role)) {
          return NextResponse.redirect(new URL(`/${role}`, req.url));
        }
      }
    } else {
      console.warn("User role is undefined. No matching or redirection will occur.");
    }
  });
  
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
