import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The local preview is sometimes opened through 127.0.0.1 while Next
  // initializes its dev server on localhost. Allow that loopback origin to
  // load development-only resources so client pages hydrate correctly.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
