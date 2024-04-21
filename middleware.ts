import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config = {
  matcher: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/"],
};
