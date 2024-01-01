/**
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * These routes are used for authentication.
 * Not required for authentication.
 * @type {string[]}
 */
export const authRoutes = ["/login", "/register"];

/**
 * These routes require authentication and are only accessible to admins.
 * @type {string[]}
 */
export const protectedRoutes = [];

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
