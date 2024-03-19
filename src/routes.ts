/**
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/", "verify"];

/**
 * These routes are used for authentication.
 * Not required for authentication.
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
 * These routes are used for the dashboard.
 * Required for authentication.
 * Only type the prefix.
 * @type {string[]}
 */
export const dashboardRoutesPrefix = "/dashboard";

/**
 * These prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect URL after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard";
