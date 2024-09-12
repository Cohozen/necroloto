// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
//
// export default authMiddleware({
//     afterAuth(auth, req, evt) {
//         // handle users who aren't authenticated
//         if (!auth.userId && !auth.isPublicRoute) {
//             return redirectToSignIn({ returnBackUrl: req.url });
//         }
//
//         // redirect to game page
//         if (auth.userId && req.nextUrl.pathname === "/") {
//             const orgSelection = new URL("/home", req.url);
//             return NextResponse.redirect(orgSelection);
//         }
//     },
//     publicRoutes: ["/"]
// });
//
// export const config = {
//     matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware((auth, request) => {
    if (!isPublicRoute(request)) {
        auth().protect();
    }
});

export const config = {
    // matcher: [
    //     // Skip Next.js internals and all static files, unless found in search params
    //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    //     // Always run for API routes
    //     "/(api|trpc)(.*)"
    // ]
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
