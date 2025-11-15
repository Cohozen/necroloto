import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth();

    // if (!userId && isProtectedRoute(request)) {
    //     return redirectToSignIn();
    // }

    if (!userId && !isPublicRoute(request)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};
