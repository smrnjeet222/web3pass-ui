import { env } from "@/env.mjs";
import { configureServerSideSIWE } from "connectkit-next-siwe";

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: "connectkit-next-siwe",
    password: env.SESSION_SECRET,
    cookieOptions: {
      secure: env.NODE_ENV === "production",
    },
  },
});
