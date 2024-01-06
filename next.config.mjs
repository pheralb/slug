import million from 'million/compiler';

await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
    swcMinify: true,
    reactStrictMode: true,
};

export default million.next(
  config, { auto: { rsc: true } }
);
