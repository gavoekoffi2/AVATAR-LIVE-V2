import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except API routes, static files, and internal Next.js paths
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
