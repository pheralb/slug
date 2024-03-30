/**
 * 🌱 These routes are public.
 * 🔓 Not required for authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "/docs", "verify", "/check"];

/**
 * 🌱 These routes are used for authentication.
 * 🔓 Not required for authentication.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth",
  "/register",
  "/auth-error",
  "/verify",
  "/reset",
  "/new-password",
];

/**
 * 🌱 These routes are protected.
 * 🔒 Required authentication.
 * @type {string[]}
 */
export const protectedRoutes = ["/dashboard", "/dashboard/settings"];

/**
 * 🌱 These routes are used for the check slug.
 * ✍️ Only type the prefix, with "/".
 * 🔓 Not required for authentication.
 * @type {string[]}
 */
export const checkRoutesPrefix = "/check";

/**
 * 🌱 These prefix for API authentication routes.
 * ✍️ Routes that start with this prefix are used for API authentication purposes.
 * 🔓 Not required for authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * 🌱 The default redirect URL after logging in.
 * 🔓 Not required for authentication.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard";
